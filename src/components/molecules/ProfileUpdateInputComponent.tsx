import React, { useCallback, useRef } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IUserForm } from '../../models/user.d'
import { IStuffTalentCommunityDto } from '../../stores/stufftalent-store.d'
import { maxLengthValidator } from '../../utils/form-util'
import { InputNormal } from '../atoms/InputNormalComponent'
import { Pad } from '../atoms/PadComponent'
import { Textarea } from '../atoms/TextareaComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { IImageUploaderRef, ImageUploadItem } from './ImageUploaderComponent'
import { ProfileImageUploader } from './ProfileImageUploaderComponent'

interface IProfileUpdateInput {
  fields: {
    register: UseFormRegister<IUserForm>
    setValue: UseFormSetValue<IUserForm>
    watch: UseFormWatch<IUserForm>
    errors: FieldErrors<IUserForm>
  }
}

export const ProfileUpdateInput: React.FC<IProfileUpdateInput> = ({ fields }) => {
  const { register, setValue, watch, errors } = fields

  const uploader = useRef<IImageUploaderRef>()

  const [watchProfileUrl, watchImage, watchCommunities] = watch(['profileUrl', 'image', 'communities'])

  const setValueCustom = useCallback((name, value) => {
    // shouldTouch: true 설정하면, checkbox값이 변경되어도 dirtyFields에 포함되지 않는다. 이유는 모름.
    setValue(name, value, { shouldDirty: true, shouldValidate: true })
  }, [])

  return (
    <>
      <input type='hidden' {...register('id')} />
      <input type='hidden' {...register('image')} />

      <Pad className='height-40' />
      <div className='flex-center'>
        <ProfileImageUploader
          imageUrl={watchImage?.preview || watchProfileUrl}
          setImage={(image: ImageUploadItem) => setValueCustom('image', image)}
          refUploader={uploader}
        />
      </div>
      <Pad className='height-40' />

      <div className='flex-center'>
        <TextBase className='flex-none gray ml-3 mr-6'>이름</TextBase>
        <InputNormal
          className='border-none'
          register={register('name', {
            required: '이름을 입력해주세요',
            minLength: { value: 2, message: '2~6글자 사이로 입력해주세요' },
            maxLength: { value: 6, message: '2~6글자 사이로 입력해주세요' },
          })}
          placeholder='이름을 입력해주세요'
        />
      </div>
      <XDivider />
      <ValidationMessage message={errors.name?.message} className='pl-20' />

      <div className='flex-center'>
        <TextBase className='flex-none gray ml-3 mr-6'>별명</TextBase>
        <InputNormal
          className='border-none'
          register={register('nickname', {
            minLength: { value: 2, message: '2~20글자 사이로 입력해주세요' },
            maxLength: { value: 20, message: '2~20글자 사이로 입력해주세요' },
          })}
          placeholder='별명을 입력해주세요 (선택사항)'
        />
      </div>
      <XDivider />
      <ValidationMessage message={errors.nickname?.message} className='pl-20' />

      <Pad className='height-10' />

      <div className='flex-center'>
        <TextBase className='flex-none gray ml-3 mr-6'>마을</TextBase>
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
          <Textarea
            register={register('description', {
              validate: (value) => maxLengthValidator(value, 100),
            })}
            placeholder='소개를 입력해주세요 (선택사항)'
            rows={5}
          />
        </div>
      </div>
      <Pad className='height-10' />
      <XDivider />
      <ValidationMessage message={errors.description?.message} className='pl-20' />
    </>
  )
}
