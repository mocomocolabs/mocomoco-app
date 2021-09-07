import * as _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { InputNormal } from '../atoms/InputNormalComponent'

export interface IHashtag {
  onChange: (v: string[]) => void
  value: string
}

let beforeInput = ''

const withSharp = (v: string) => {
  // (공백,) 또는 (공백#) 또는 (알파벳숫자한글#가 아닌) 문자를 공백으로 치환
  const convert = v.replace(/( +,)|( +#)|[^A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣#]+/g, ' ')

  let withSharp = ''
  withSharp = convert.split(' ').join(' #')

  if (!withSharp.startsWith('#')) {
    withSharp = '#' + withSharp
  }
  return withSharp
}

export const Hashtag: FC<IHashtag> = ({ value = '', onChange }) => {
  const [val, setVal] = useState(withSharp(value))

  const setAndOnChange = (v: string) => {
    beforeInput = v
    setVal(v)
    onChange(_.compact(v.split('#')))
  }

  return useObserver(() => (
    <InputNormal
      value={val}
      placeholder='#해시태그를_적어주세요'
      onChange={(value) => {
        if (value === '') {
          return setAndOnChange('#')
        }

        // 삭제하는 경우 그대로 리턴
        if (beforeInput.length > value.length) {
          return setAndOnChange(value)
        }

        if (value.endsWith('# ') || value.endsWith('##')) {
          return setAndOnChange(value.slice(0, value.length - 1))
        }

        setAndOnChange(withSharp(value))
      }}
    />
  ))
}
