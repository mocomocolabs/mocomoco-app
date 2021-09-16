import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { maxLengthValidator } from '../../utils/form-util'
import { executeWithError } from '../../utils/http-helper-util'
import { scrollToBottom } from '../../utils/scroll-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'
import './CommentInsertFormComponent.scss'

export interface ICommentInsertForm {
  feedId: number
  autoFocus?: boolean
}

export const CommentInsertForm: React.FC<ICommentInsertForm> = ({ feedId, autoFocus = false }) => {
  const { $comment, $feed, $auth, $ui } = useStore()

  const [isValid, setValid] = useState<boolean>(false)

  return useObserver(() => (
    <div className='comment-insert-container flex-center flex-1'>
      <ProfileImage url={$auth.user?.profileUrl}></ProfileImage>

      <div className='flex-between-center w-full ml-3 px-3 br-20 border-primary'>
        <IonTextarea
          autoGrow={true}
          rows={1}
          placeholder='댓글을 입력해주세요'
          value={$comment.insertForm[feedId]?.content}
          autofocus={autoFocus}
          onIonChange={(e) => {
            const value = e.detail.value!
            const validate = maxLengthValidator(value, 100)

            setValid(validate === true)
            validate === true
              ? $comment.setInsertFormBy(feedId, value)
              : $ui.showToastError({ message: validate })
          }}
        />

        <SpinnerWrapper
          task={$comment.insertComment}
          Submit={
            <Icon
              name='send-solid'
              className={isValid && $comment.insertForm[feedId]?.content ? 'icon-secondary' : 'icon-gray'}
              onClick={() => {
                if (isValid && $comment.insertForm[feedId]?.content) {
                  executeWithError(async () => {
                    await $comment.insertComment({ feedId, content: $comment.insertForm[feedId]?.content })
                    await $feed.getFeed(feedId)
                    $comment.resetInsertFormBy(feedId)
                    scrollToBottom()
                  })
                }
              }}
            ></Icon>
          }
        />
      </div>
    </div>
  ))
}
