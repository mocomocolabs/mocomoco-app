import * as _ from 'lodash'

export const removeUndefined = (obj: any) =>
  _.pickBy(obj, (val) => (val && _.isString(val)) || _.isNumber(val) || !_.isEmpty(val))
