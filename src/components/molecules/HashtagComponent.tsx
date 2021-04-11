import * as _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { InputNormal } from '../atoms/InputNormalComponent'

export interface IHashtag {
  onChange: (v: string[]) => void
  value: string
}

export const Hashtag: FC<IHashtag> = ({ value = '', onChange }) => {
  const [val, setVal] = useState(value)

  return useObserver(() => (
    <InputNormal
      value={val}
      placeholder='#해시태그를 적어주세요'
      onChange={(e) => {
        // (공백,) 또는 (공백#) 또는 (알파벳숫자한글#가 아닌) 문자를 공백으로 치환
        const convert = e.replace(/( +,)|( +#)|[^A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣#]+/g, ' ')

        let withSharp = convert.split(' ').join(' #')

        if (!withSharp.startsWith('#')) {
          withSharp = '#' + withSharp
        }

        if (withSharp.endsWith('#')) {
          withSharp = withSharp.substr(0, withSharp.length - 1)
        }

        setVal(withSharp)
        onChange(_.compact(withSharp.split('#')))
      }}
    />
  ))
}
