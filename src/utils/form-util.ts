export const maxLengthValidator = (value = '', maxLength: number) =>
  value.length <= maxLength || `글자수를 확인해주세요 (${value.length} / ${maxLength}자)`
