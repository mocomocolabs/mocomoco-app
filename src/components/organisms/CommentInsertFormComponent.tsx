import { IonTextarea } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/use-store'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { SpinnerWrapper } from '../helpers/SpinnerWrapper'

export interface ICommentInsertForm {
  feedId: number
  autoFocus?: boolean
}

export const CommentInsertForm: React.FC<ICommentInsertForm> = ({ feedId, autoFocus = false }) => {
  const { $comment, $feed, $auth } = useStore()

  return useObserver(() => (
    <div className='px-container py-2 flex items-center bg-white'>
      <ProfileImage url={$auth.userInfo?.profileUrl}></ProfileImage>

      <IonTextarea
        className='ml-2 br-20 pl-4 px-3 black leading-8 border-primary'
        autoGrow={true}
        rows={1}
        placeholder='댓글을 입력해주세요'
        value={$comment.insertForm[feedId]?.content}
        autofocus={autoFocus}
        onIonChange={(e) => {
          $comment.setInsertFormBy(feedId, e.detail.value!)
        }}
      ></IonTextarea>

      <div className='ml-2'>
        <SpinnerWrapper
          task={$comment.insertComment}
          Submit={() => (
            <Icon
              name='send-solid'
              className='icon-secondary'
              onClick={() => {
                if ($comment.insertForm[feedId]?.content) {
                  executeWithError(async () => {
                    // TODO: 댓글입력 api 의존성 분리
                    await $comment.insertComment({ feedId, content: $comment.insertForm[feedId]?.content })
                    await $feed.getFeed(feedId)
                    $comment.resetInsertFormBy(feedId)
                  })
                }
              }}
            ></Icon>
          )}
        ></SpinnerWrapper>
      </div>
    </div>
  ))
}
