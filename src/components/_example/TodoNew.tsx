import { IonButton, IonInput } from '@ionic/react'
import React, { useState } from 'react'

import { onEnterPress } from '../../hooks/use-enter'
import { useStore } from '../../hooks/use-store'

export const TodoNew = () => {
  const [newTodo, setTodo] = useState('')
  const { todoList } = useStore()

  const addTodo = () => {
    todoList.addTodo(newTodo)
    setTodo('')
  }

  return (
    <div>
      <IonInput
        placeholder='검색'
        onKeyDown={onEnterPress(addTodo)}
        onIonChange={(e) => todoList.setQuery(e.detail.value ?? '')}
      />
      <IonInput
        placeholder='입력'
        onKeyDown={onEnterPress(addTodo)}
        onIonChange={(e) => setTodo(e.detail.value ?? '')}
      />
      <IonButton onClick={addTodo}>Add Todo</IonButton>
    </div>
  )
}
