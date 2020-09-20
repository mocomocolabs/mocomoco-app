import { IonInput } from '@ionic/react'
import React, { useState } from 'react'
import { onEnterPress } from '../../hooks/use-enter'
import { useStore } from '../../hooks/use-store'
import { TodoItem as TodoItemClass } from '../../stores/example/todo-item-store'

interface Props {
  todo: TodoItemClass
}

export const TodoItem = ({ todo }: Props) => {
  const { todoList } = useStore()
  const [newText, setText] = useState('')
  const [isEditing, setEdit] = useState(false)

  const saveText = () => {
    todo.updateText(newText)
    setEdit(false)
    setText('')
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <IonInput
            type='text'
            placeholder='수정'
            onKeyDown={onEnterPress(saveText)}
            onIonChange={(e) => setText(e.detail.value ?? '')}
          />
          <button onClick={saveText}>save</button>
        </div>
      ) : (
        <div>
          <span>{todo.text}</span>
          <input type='checkbox' onChange={todo.toggleIsDone} defaultChecked={todo.isDone}></input>
          <button onClick={() => setEdit(true)}>edit</button>
          <button onClick={() => todoList.removeTodo(todo)}>X</button>
        </div>
      )}
    </div>
  )
}
