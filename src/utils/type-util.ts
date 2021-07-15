export type ValueOf<T> = T[keyof T]

export const isIterable = (value: typeof Object) => Symbol.iterator in Object(value)
