import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import React, { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { FeedItem } from '../components/molecules/FeedItemComponent'
import { CommentInsertForm } from '../components/organisms/CommentInsertFormComponent'
import { CommentUpdateForm } from '../components/organisms/CommentUpdateFormComponent'
import { ContentPopover } from '../components/organisms/ContentPopoverComponent'
import { useStore } from '../hooks/use-store'

interface ILocationState {
  autoFocus?: boolean
}

export const FeedDetail: React.FC<RouteComponentProps<{ id: string }, StaticContext, ILocationState>> = ({
  match,
  location,
}) => {
  const id = parseInt(match.params.id)

  const { $feed, $ui, $comment } = useStore()

  useEffect(() => {
    // TODO : 게시글 접근제한 테스트 필요
    $feed.getFeed(id)
    // eslint-disable-next-line
  }, [])

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
    $comment.setUpdateCommentId(null)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
  })

  // eslint-disable-next-line
  const taskGroup = TaskGroup<any[], void>([$feed.getFeed, $comment.deleteComment])

  return useObserver(() => (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton></BackButton>
          </div>
          <div slot='end'></div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          {taskGroup.match({
            pending: () => <Spinner isFull={true}></Spinner>,
            resolved: () => <FeedItem feed={$feed.feed} isDetail={true}></FeedItem>,
          })}
        </div>
        <ContentPopover></ContentPopover>
      </IonContent>

      <IonFooter>
        {$comment.updateCommentId === null && (
          <CommentInsertForm feedId={id} autoFocus={location?.state?.autoFocus}></CommentInsertForm>
        )}
        {$comment.updateCommentId !== null && (
          <CommentUpdateForm commentId={$comment.updateCommentId}></CommentUpdateForm>
        )}
      </IonFooter>
    </IonPage>
  ))
}
