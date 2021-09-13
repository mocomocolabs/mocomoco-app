import { FC, useMemo } from 'react'
import { useStore } from '../../hooks/use-store'
import { IComment } from '../../models/comment.d'
import { timeDiff } from '../../utils/datetime-util'
import { MorePopoverButton } from './MorePopoverButtonComponent'
import { ProfileCard } from './ProfileCardComponent'

export interface ICommentItem {
  comment: IComment
  feedId: number
  showOverlowMenu: boolean
  collapse?: boolean
  className?: string
}

export const CommentItem: FC<ICommentItem> = ({
  comment,
  feedId,
  showOverlowMenu,
  collapse = false,
  className,
}) => {
  const { $comment, $feed, $ui } = useStore()

  const onDelete = async (id: number) => {
    await $comment.deleteComment(id)
    await $feed.getFeed(feedId)
  }

  const onEdit = (id: number, content: string) => {
    $comment.setUpdateFormBy(id, content)
    $comment.setUpdateCommentId(id)
  }

  const popoverItems = useMemo(
    () => [
      {
        label: '수정',
        onClick: () => onEdit(comment.id, comment.content),
      },
      {
        label: '삭제',
        onClick: () => {
          $ui.showAlert({
            message: '댓글을 삭제하시겠어요?',
            onSuccess: () => onDelete(comment.id),
          })
        },
      },
    ],
    []
  )

  return (
    <div className={`${className} flex-col w-full`}>
      <div className='flex-between-center mb-2'>
        <ProfileCard
          userId={comment.user.id}
          profileUrl={comment.user.profileUrl}
          communityName={comment.user.communities[0]?.name}
          nickname={comment.user.nickname}
          extraText={timeDiff(comment.createdAt)}
        ></ProfileCard>

        {showOverlowMenu && <MorePopoverButton items={popoverItems} />}
      </div>
      <div className='flex flex-none ml-13 pre-line ellipsis' style={{ maxHeight: collapse ? '3.2em' : '' }}>
        {comment.content}
      </div>
    </div>
  )
}
