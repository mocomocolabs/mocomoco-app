export type ValueOf<T> = T[keyof T]
export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key]
