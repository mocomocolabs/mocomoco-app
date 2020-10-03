import { IonIcon } from '@ionic/react'
import { ellipsisVertical } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IComment } from '../../models/comment'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { XDivider } from '../atoms/XDividerComponent'

export interface ICommentItem {
  comment: IComment
  feedId: number
}

export const CommentItem: FC<ICommentItem> = ({ comment, feedId }) => {
  const { $ui, $feed, $comment } = useStore()

  return useObserver(() => (
    <>
      <div className='flex'>
        <Profile key={comment.id} url={comment.user.profileUrl}></Profile>
        <div className='flex-col flex-1'>
          <div className='flex-between-center'>
            <TextBase>{comment.user.nickname}</TextBase>
            <div className='flex items-center'>
              <TextSm className='gray'>{comment.createdAt}</TextSm>
              {/* TODO : 본인 댓글에만 나오도록 작업 */}
              <IonIcon
                icon={ellipsisVertical}
                onClick={async (e) => {
                  const action = await $ui.showPopover(e.nativeEvent)
                  switch (action) {
                    case 'DELETE':
                      $ui.showAlert({
                        isOpen: true,
                        message: '댓글을 삭제하시겠어요?',
                        onSuccess: async () => {
                          // TODO: 로더 추가
                          await $comment.deleteComment(comment.id)
                          await $feed.getFeed(feedId)
                        },
                      })
                    case 'EDIT':
                      $comment.setUpdateFormBy(comment.id, comment.content)
                      $comment.setUpdateCommentId(comment.id)
                  }
                }}
              ></IonIcon>
            </div>
          </div>
          <TextBase>{comment.content}</TextBase>
        </div>
      </div>
      <XDivider></XDivider>
    </>
  ))
}
