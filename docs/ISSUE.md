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
