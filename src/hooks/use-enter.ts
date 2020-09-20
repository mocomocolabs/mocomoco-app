import { KeyboardEvent } from 'react'

export const onEnterPress = (cb: () => void) => {
  return (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      cb()
    }
  }
}
