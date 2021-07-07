# issue

## mobx with destructuring

- 아래와 같이 destructring해서 사용하면 값이 observable 되지 않는다.
  https://github.com/stolenng/react-hooks-mobx/issues/2

```typescript
const ExampleContainer: React.FC<INewsList> = () => {
  const {
    news: { filteredNews },
  } = useStore() // 값이 observable 되지 않는다.
  const { news } = useStore() // 이렇게 사용하면 동작한다.

  return useObserver(() => (
    <ul>
      {filteredNews.map((v, i) => (
        <NewsItem key={i} title={v.title}></NewsItem>
      ))}
    </ul>
  ))
}
```

mobx는 property를 통해 값을 트랙킹한다고 한다. 그래서 desturcturing을 통해 값을 생성하여 사용하면 트랙킹이 안된다. 아래와 같은 방법을 통해 처리하면 된다.

```typescript
export const TodoList = () => {
  const todoList = useStore()

  return useObserver(() => {
    const { openTodos, finishedTodos } = todoList

    return (
      <div className='todo-list'>
        {openTodos.map((todo) => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
    )
  })
}
```

```typescript
const TodoListComponent = () => {
  const { openTodos, finishedTodos } = useStore()

  return (
    <div className='todo-list'>
      {openTodos.map((todo) => (
        <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
      ))}
    </div>
  )
}

export const TodoList = observer(TodoListComponent)
```

## mobx-task type

Task 함수를 만들때 인자를 받고 싶다면, 다음과 같이 선언하면 된다

```typescript
  import { Task } from 'mobx-task'

  @task
  getFeed = (async (id: number) => {
    await http.get<IFeed>(`/feeds/${id}`).then(
      action((data) => {
        this.feed = data
      })
    )
  }) as Task<[number], void>
```

그러나 위와같이 하면 map undefined 에러가 난다. 아직 왜 그런지 모르겠다..
아래와 같이 \*.d.ts 파일을 만들어 import 하여 사용하면 해당 에러가 안난다.

- src/stores/task.d.ts

```typescript
import { Task as TaskType } from 'mobx-task'
export type Task = TaskType<[], void>
export type TaskByNumber = TaskType<[number], void>
```

```typescript
  import { TaskByNumber } from './task.d'

  @task
  getFeed = (async (id: number) => {
    await http.get<IFeed>(`/feeds/${id}`).then(
      action((data) => {
        this.feed = data
      })
    )
  }) as TaskByNumber
```

> 따라서, 파라미터를 받을 경우 `feed-store.d.ts` 처럼 타입을 따로 만들어서 import 하여 사용한다.

## useStore 사용시 react-hook 동작하지 않음

현재 아래 예제에서 isLogin이 변경되도 useEffect가 재실행되지 않는다. 어떤 이유인지는 파악해야함!

```
  useEffect(() => {
    console.log('init')

    init()
  }, [$auth.isLogin])

```

observable값의 변경을 추적하는 방법은 다음과 같다.

1. render되는 부분에서는 useObserver(() => ...) 또는 \<Observer\>\</Observer\> 를 이용하면 변경사항이 추적되고 적용됨
2. render 이외에 side effect 시점에서는 autorun, reaction, when 등 mobx에서 제공하는 hook을 사용해서 추적함

- 관련 문서 : https://mobx.js.org/reactions.html
- 예제

```typescript
useEffect(() => {
    // 컴포넌트에 새로 진입할 때, observable 추적용 reaction을 등록해둔다.
    // 이 때, reaction을 해제(dispose)시킬 수 있는 메서드를 리턴받는다.
    const disposeReaction = reaction(
      () => $community.selectedId,
      (selectedId) => {
        setFilter({ ...filter, communityId: selectedId })
      }
    )

    // cleanup 함수로 설정해 두면 컴포넌트를 떠나는 시점에 reaction을 해제시킨다.
    return () => disposeReaction()
  }, [])

// 축약 버젼
useEffect(() => reaction(
      () => $community.selectedId,
      (selectedId) => {
        setFilter({ ...filter, communityId: selectedId })
      }
    )
  }, [])
```

## react-svg

react-svg library ^12 이상으로 사용할시에, svg가 잘 로드되지 않는 현상이 발생한다. 우선 v11 으로 고정하여 사용하도록 함

## IonPopover의 dismiss animation 관련 이슈 수정

```
index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at MorePopoverButton (http://localhost:3000/static/js/main.chunk.js:10276:3)
    at div
    at div
    at div
    at div
    at li
    at StuffTalentItem (http://localhost:3000/static/js/main.chunk.js:12615:3)
    at ul
    at StuffTalentList (http://localhost:3000/static/js/main.chunk.js:15806:3)
    at div
    at ion-content
    at ReactComponent (http://localhost:3000/static/js/vendors~main.chunk.js:12738:7)
    at IonContent
    at div
    at PageManager (http://localhost:3000/static/js/vendors~main.chunk.js:13127:5)
    at IonPageInternal (http://localhost:3000/static/js/vendors~main.chunk.js:13199:5)
    at IonPage
    at StuffTalentPage (http://localhost:3000/static/js/main.chunk.js:22339:73)
```

- 관련 수정 사항 : https://github.com/mocomocolabs/mocomoco-app/pull/100/commits/31097100471fd32fb2ead4fc6e60d69e3c08cadb

- 추정원인 : popover가 dismiss될 때 animation이 동작하는게 기본값인데, 다른 페이지로 전환되는 과정과 맞물리면 컴포넌트(popover 컴포넌트, StuffList/ClubList 등)가 사라지고 있으므로 animation이 동작하다가 실패해서 에러 발생함.

- 해결안1. animated=false로 설정하기. useIonPopover 쓰는 한 이 방법 뿐인 듯. (이 방안을 적용했음)

- 해결안2. animated=true를 유지하고 싶다면, IonPopover component를 사용해서 해결 가능함. 그러나 제약이 있다.
  onClick에서 popoverState를 변경시키면 animation이 발동되므로 동일한 이슈가 발생한다. 따라서, onClick에선 setPopoverState호출하지 말고 useEffect의 cleanup 함수에서 popoverState를 reset하면 된다. 이 타이밍에는 아마도 animation이 발동되지 않는 듯 싶다.
  이렇게 구현할 경우, 페이지전환하지 않을 때는 useEffect cleanup이 호출되지 않으니 팝업이 닫히지 않게 된다는 것이 치명적인 제약사항이다.
