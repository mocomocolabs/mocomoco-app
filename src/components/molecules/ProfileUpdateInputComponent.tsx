import { IonAvatar, IonLabel, IonToggle } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Controller, Message, useFormContext } from 'react-hook-form'
import { IUser } from '../../models/user'
import { TextBase } from '../atoms/TextBaseComponent'

interface IProfileUpdateInput {
  user: IUser
}

export const ProfileUpdateInput: React.FC<IProfileUpdateInput> = ({ user }) => {
  const { register, control, errors } = useFormContext()

  return useObserver(() => (
    <>
      <IonAvatar className='w-30 h-30 my-8 self-center'>
        <img src={user.profileUrl} alt='프로필이미지' />
      </IonAvatar>

      <input type='hidden' name='profileUrl' defaultValue={user.profileUrl} ref={register} />

      <input
        type='text'
        className='input-text mb-4'
        name='nickname'
        placeholder='별명을 입력해 주세요'
        defaultValue={user.nickname}
        ref={register}
      />

      <input
        type='text'
        className='input-text'
        name='status'
        placeholder='상태메시지를 입력해주세요'
        defaultValue={user.status}
        ref={register}
      />

      <input
        type='text'
        className='input-text mt-9 mb-4'
        name='mobile'
        placeholder='전화번호를 입력해주세요'
        defaultValue={user.mobile}
        ref={register({
          required: 'this field is required',
          pattern: {
            value: /^[0-9]{3}[-]+[0-9]{3,4}[-]+[0-9]{4}$/i,
            message: 'invalied phone number',
          },
        })}
      />
      {errors.mobile && <TextBase className='red'>{errors.mobile.message}</TextBase>}

      <div className='flex-between-center w-full'>
        <IonLabel slot='start'>전화번호 공개</IonLabel>
        <Controller
          control={control}
          name='mobileOpen'
          render={({ onChange, name, value }) => (
            <IonToggle
              name={name}
              onIonChange={(e) => {
                onChange(e.detail.checked ? 'on' : 'off')
              }}
              checked={value === 'on'}
              slot='end'
            />
          )}
          defaultValue={user.mobileOpen}
        />
      </div>

      <input
        type='email'
        className='input-text mt-9 mb-4'
        name='email'
        defaultValue={user.email}
        ref={register({
          required: 'this field is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalied email address',
          },
        })}
      />

      <ErrorText errorField={errors.email} />

      <div className='flex-between-center w-full'>
        <IonLabel slot='start'>이메일 공개</IonLabel>
        <Controller
          control={control}
          name='emailOpen'
          render={({ onChange, name, value }) => (
            <IonToggle
              name={name}
              onIonChange={(e) => {
                onChange(e.detail.checked ? 'on' : 'off')
              }}
              checked={value === 'on'}
              slot='end'
            />
          )}
          defaultValue={user.emailOpen}
        />
      </div>
    </>
  ))
}

interface IErrorText {
  errorField: { message: Message | React.ReactElement }
}

const ErrorText: React.FC<IErrorText> = ({ errorField }) =>
  errorField ? <TextBase className='red'>{errorField.message}</TextBase> : <></>
