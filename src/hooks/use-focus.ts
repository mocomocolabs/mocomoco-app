import { useRef } from 'react'

export const useFocus = () => {
  const htmlElRef = useRef<HTMLIonInputElement>()
  const setFocus = () => {
    console.log(htmlElRef)

    htmlElRef?.current?.setFocus()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [htmlElRef as any, setFocus]
}
