import { AES, enc } from 'crypto-js'

export const encrypt = (val: string, key: string): string => {
  return AES.encrypt(val, key).toString()
}

export const decrypt = (val: string, key: string): string => {
  return AES.decrypt(val, key).toString(enc.Utf8)
}
