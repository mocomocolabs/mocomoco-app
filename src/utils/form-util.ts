export const maxLengthValidator = (value = '', maxLength: number) =>
  value.length <= maxLength || `글자수를 확인해주세요 (${value.length} / ${maxLength}자)`

export const minNumberValidator = (value: number, min: number) =>
  value >= min || `${min - 1}보다 큰 숫자를 입력해주세요`

export const maxNumberValidator = (value: number, max: number) =>
  value <= max || `${max + 1}보다 작은 숫자를 입력해주세요`

export const minMaxNumberValidator = (value: number, min: number, max: number) => {
  const result = minNumberValidator(value, min)
  return result === true ? maxNumberValidator(value, max) : result
}
