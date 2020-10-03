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
