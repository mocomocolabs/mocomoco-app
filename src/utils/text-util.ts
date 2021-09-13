import _ from 'lodash'

export const collapseTextByLine = (text: string, line: number) => {
  const textByLine = _.split(text, '\n')

  return textByLine.length <= line ? text : textByLine.slice(0, line).join('\n')
}
