import * as _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeUndefined = (obj: any) =>
  _.pickBy(obj, (val) => (val && _.isString(val)) || _.isNumber(val) || !_.isEmpty(val))
