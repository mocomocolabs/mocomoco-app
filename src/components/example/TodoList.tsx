import { IonBadge } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'

import { useStore } from '../../hooks/use-store'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const { todoList } = useStore()

  return useObserver(() => (
    <div>
      <div>
        <IonBadge color='secondary'>Open Todos</IonBadge>
        {todoList.openTodos.map((todo) => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
      <div>
        <IonBadge color='tertiary'>Finished Todos</IonBadge>
        {todoList.finishedTodos.map((todo) => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
      <div>
        <IonBadge color='dark'>query Todos</IonBadge>
        {todoList.filteredTodos.map((todo) => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
    </div>
  ))
}
