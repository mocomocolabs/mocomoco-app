export type ValueOf<T> = T[keyof T]

export const isIterable = (value: typeof Object) => Symbol.iterator in Object(value)

export const isOfType = <T>(varToBeChecked: unknown, propertyToCheckFor: keyof T): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined
