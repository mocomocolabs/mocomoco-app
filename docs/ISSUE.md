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

## IonReactRouter 사용 시 라우팅이 중복 발생하는 이슈

- 기존 routing 구조 : IonReactRouter + IonRouterOutlet + IonTabs
- 이 구조에서 발생하는 문제 :

1. tabbar를 통해 페이지 전환 시, 기존에 표시되던 페이지가 호출된 후 새 페이지가 이어서 호출된다.
2. 기존 페이지가 호출될 때 history.pathname값은 새로 갱신된 상태라서, 페이지와 pathname이 일치하지 않는 문제가 생긴다. 이때문에 pathname으로 뭔가 구분하는 코드가 있다면 오작동하게 된다.

- 진단 : IonReactRouter + IonRouterOutlet 구조로는 답이 없다. IonTabs와는 무관하다. IonReactRouter 사용시 라우팅이 여러번 발생하는 문제는 ionic 프레임웤쪽에 이슈로 올라가 있던데, 횟수를 줄이려는 노력을 해온 모양이지만 여전히 2~3차례씩 라우팅되는 듯 하다.
- 해결책 : react-router-dom.Router 를 쓰자. 일단 Router + Switch + NavLink(이건 자유) 구조로 바꿔봤다. 이때, IonRouterOutlet을 사용하지 않으니 useIonViewWillEnter/Leave, ...DidEnter/Leave 등 ionic lifecycle hook들이 trigger되지 않게 된다. 해당 hook들은 React.useEffect로 변경하면 된다. 타이밍에 약간의 차이는 있겠으나, 동작에 문제를 초래하진 않아 보인다.

```typescript
// before
useIonViewWillEnter(() => {
  doWhenEnter()
})

useIonViewWillLeave(() => {
  doWhenLeave()
})

// after
useEffect(() => {
  doWhenEnter()
}, [])

useEffect(() => {
  return () => doWhenLeave()
}, [])

// 합쳐도 된다
useEffect(() => {
  doWhenEnter()

  return () => doWhenLeave()
}, [])
```

- 기타 문제 : useLocation().history.pathname 값은 location.history.pathname 및 useHistory().pathname 값에 비해 갱신이 느리다. 그래서 새 페이지가 라우팅됐는데도 pathname은 이전 값으로 남아 있는 떄가 있다. 아마, IonReactRouter의 버그인듯 하다. 아무튼, 되도록 useLocation()은 사용하지 말자.

```typescript
// 아래 값들을 쓰면 된다
useHistory().pathname

location.history.pathname
```

## react-hook-form 사용 시, dirtyFields 갱신 문제

### 기본값(defaultValues) 설정 관련 문제

- react-hook-form의 dirtyFields가 정상적으로 동작하려면,
  제공하는 api를 이용해서 default value 값들을 설정해 줘야 함.
- 그렇게 하지 않고, input 필드에 직접 defaultValue를 지정할 경우에는
  필드를 한 번 클릭만 해도 dirtyFields에 포함되며, 다시 원래 값으로 돌려놔도
  dirtyFields에서 제외되지 않고 계속 남아 있음.

1. useForm 호출 시 defaultValues 프로퍼티 설정하거나,

```typescript
const {
  formState: { isValid, dirtyFields, errors },
  reset,
  handleSubmit,
  control,
  register,
  getValues,
  setValue,
} = useForm<IUser>({
  mode: 'onChange',
  defaultValues: { ...$user.user },
})
```

2. reset() 호출해서 default value를 재설정하기

```typescript
useEffect(() => {
  reset({ ...$user.user }, { keepDefaultValues: false })
}, [reset, $user.user])
```

- 단, useEffect는 첫 render 이후에 호출되기 때문에, default value가 설정되는 타이밍이 살짝 늦어진다.
  그래서, 첫 렌더링 과정에서 form값을 가지고 무언가 판별하는 로직이 있다면, 그 때는 기본값이 없는 상태라서 빈 값을 참조하게 되니 주의가 필요함.

### setValue 로 값 변경 시 dirtyFields에 반영되지 않는 문제

- input의 값을 코드 상에서 직접 변경할 때 setValue 호출하면 되는데,
  이때 shouldDirty와 shouldValidate를 true로 설정해주면 form의 dirty와 validate가 즉시 갱신된다.
- 단, shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.

```typescript
// 요래 하면 된다.
setValue(name, value, { shouldDirty: true, shouldValidate: true })
```
