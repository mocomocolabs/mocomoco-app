import { IonAvatar, IonToggle } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Controller, FieldError, FieldValues } from 'react-hook-form'
import { InputNormal } from '../atoms/InputNormalComponent'
import { TextXs } from '../atoms/TextXsComponent'

interface IProfileUpdateInput {
  fields: FieldValues
}

export const ProfileUpdateInput: React.FC<IProfileUpdateInput> = ({ fields }) => {
  const { register, control, errors, getValues } = fields

  return useObserver(() => (
    <>
      <input type='hidden' {...register('id')} />
      <input type='hidden' {...register('profileUrl')} />

      <IonAvatar className='w-30 h-30 my-3 self-center'>
        <img src={getValues('profileUrl')} alt='프로필이미지' />
      </IonAvatar>

      <InputNormal
        register={register('nickname', { required: '별명을 입력해 주세요' })}
        placeholder='별명을 입력해 주세요'
      />

      <ErrorText field={errors.nickname} />

      <InputNormal placeholder='상태메시지를 입력해 주세요' register={register('status')} disabled={true} />

      <InputNormal
        placeholder='010-1234-5678'
        register={register('mobile', {
          required: '전화번호를 입력해 주세요',
          pattern: {
            value: /^[0-9]{3}[-]+[0-9]{3,4}[-]+[0-9]{4}$/i,
            message: '전화번호를 확인해 주세요',
          },
        })}
      />

      <ErrorText field={errors.mobile} />

      <div className='flex-between-center w-full pb-3'>
        <label slot='start'>전화번호 공개</label>
        <Controller
          control={control}
          name='isPublicMobile'
          render={({ field: { name, onChange, value } }) => (
            <IonToggle
              name={name}
              onIonChange={(e) => {
                onChange(e.detail.checked)
              }}
              checked={value}
              slot='end'
            />
          )}
        />
      </div>

      <InputNormal register={register('email')} disabled={true} />

      <div className='flex-between-center w-full pb-3'>
        <label slot='start'>이메일 공개</label>
        <Controller
          control={control}
          name='isPublicEmail'
          render={({ field: { name, onChange, value } }) => (
            <IonToggle
              name={name}
              onIonChange={(e) => {
                onChange(e.detail.checked)
              }}
              checked={value}
              slot='end'
            />
          )}
        />
      </div>
    </>
  ))
}

interface IErrorText {
  field?: FieldError
}

// TODO how to show error message?
const ErrorText: React.FC<IErrorText> = ({ field }) => <TextXs className='red'>{field?.message}</TextXs>
