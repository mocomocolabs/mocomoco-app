import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IComment } from '../../models/comment'
import { timeDiff } from '../../utils/datetime-util'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { XDivider } from '../atoms/XDividerComponent'

export interface ICommentItem {
  comment: IComment
  feedId: number
  showOverlowMenu: boolean
}

export const CommentItem: FC<ICommentItem> = ({ comment, feedId, showOverlowMenu }) => {
  const { $comment, $feed } = useStore()

  const onDelete = async (id: number) => {
    await $comment.deleteComment(id)
    await $feed.getFeed(feedId)
  }

  const onEdit = (id: number, content: string) => {
    $comment.setUpdateFormBy(id, content)
    $comment.setUpdateCommentId(id)
  }

  return useObserver(() => (
    <>
      <div className='flex'>
        <ProfileImage key={comment.id} url={comment.user.profileUrl}></ProfileImage>
        <div className='flex-col flex-1'>
          <div className='flex-between-center'>
            <TextBase>{comment.user.nickname}</TextBase>
            <div className='flex items-center'>
              <TextSm className='gray'>{timeDiff(comment.createdAt)}</TextSm>
              <OverflowMenuIcon
                show={showOverlowMenu}
                onDelete={() => onDelete(comment.id)}
                onEdit={() => onEdit(comment.id, comment.content)}
              />
            </div>
          </div>
          <TextBase>{comment.content}</TextBase>
        </div>
      </div>
      <XDivider></XDivider>
    </>
  ))
}
