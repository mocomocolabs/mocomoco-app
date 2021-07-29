import { useObserver } from 'mobx-react-lite'
import React, { useCallback, useRef } from 'react'
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IUser } from '../../models/user'
import { IStuffTalentCommunityDto } from '../../stores/stufftalent-store.d'
import { InputNormal } from '../atoms/InputNormalComponent'
import { Pad } from '../atoms/PadComponent'
import { Textarea } from '../atoms/TextareaComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { IImageUploaderRef } from './ImageUploaderComponent'
import { ProfileImageUploader } from './ProfileImageUploaderComponent'

interface IProfileUpdateInput {
  fields: {
    register: UseFormRegister<IUser>
    setValue: UseFormSetValue<IUser>
    watch: UseFormWatch<IUser>
    control: Control<IUser>
  }
}

export const ProfileUpdateInput: React.FC<IProfileUpdateInput> = ({ fields }) => {
  const { register, setValue, watch, control } = fields

  const uploader = useRef<IImageUploaderRef>()

  const [watchProfileUrl, watchCommunities] = watch(['profileUrl', 'communities'])

  const setValueCustom = useCallback((name, value) => {
    // shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.
    setValue(name, value, { shouldDirty: true, shouldValidate: true })
  }, [])

  return useObserver(() => (
    <>
      <input type='hidden' {...register('id')} />
      <input type='hidden' {...register('profileUrl')} />

      <Pad className='height-60' />
      <div className='flex-center'>
        <ProfileImageUploader
          className='mt-5'
          imageUrl={watchProfileUrl}
          setImageUrl={(url) => setValueCustom('profileUrl', url)}
          refUploader={uploader}
        />
      </div>
      <Pad className='height-40' />

      <div className='flex-center'>
        <TextBase className='flex-none gray ml-3 mr-6'>이름</TextBase>
        <InputNormal
          className='border-none'
          register={register('name', { required: '이름을 입력해 주세요' })}
          placeholder='이름을 입력해 주세요'
        />
      </div>
      <XDivider />

      <div className='flex-center'>
        <TextBase className='flex-none gray ml-3 mr-6'>별명</TextBase>
        <InputNormal
          className='border-none'
          register={register('nickname')}
          placeholder='별명을 입력해 주세요 (선택사항)'
        />
      </div>
      <XDivider />
      <Pad className='height-10' />

      <div className='flex-center'>
        <TextBase className='flex-none gray ml-3 mr-6'>소속</TextBase>
        <TextBase className='flex-grow gray pl-3'>
          {(watchCommunities as IStuffTalentCommunityDto[])?.map((c) => c.name).join(' / ')}
        </TextBase>
      </div>

      <Pad className='height-10' />
      <XDivider />
      <Pad className='height-10' />

      <div className='flex-center items-start'>
        <TextBase className='flex-none gray ml-3 mr-6'>소개</TextBase>
        <div className='flex-grow -my-3'>
          <Textarea register={register('description')} placeholder='소개를 입력해 주세요 (선택사항)' />
        </div>
      </div>
      <Pad className='height-10' />
      <XDivider />
    </>
  ))
}
