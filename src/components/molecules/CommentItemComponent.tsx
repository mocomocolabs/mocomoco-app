import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { IComment } from '../../models/comment'
import { timeDiff } from '../../utils/datetime-util'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { XDivider } from '../atoms/XDividerComponent'
import { ProfileCard } from './ProfileCardComponent'

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
      <div className='flex-col'>
        <div className='flex-between-center mb-2'>
          <ProfileCard
            profileUrl={comment.user.profileUrl}
            communityName={comment.user.communities[0]?.name}
            nickname={comment.user.nickname}
            extraText={timeDiff(comment.createdAt)}
          ></ProfileCard>

          <OverflowMenuIcon
            show={showOverlowMenu}
            onDelete={() => onDelete(comment.id)}
            onEdit={() => onEdit(comment.id, comment.content)}
          />
        </div>
        <TextBase className='ml-13'>{comment.content}</TextBase>
      </div>
      <XDivider></XDivider>
    </>
  ))
}
