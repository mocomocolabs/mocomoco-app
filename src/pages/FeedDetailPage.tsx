import { IonContent, IonFooter, IonPage, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { FeedItem } from '../components/molecules/FeedItemComponent'
import { CommentInsertForm } from '../components/organisms/CommentInsertFormComponent'
import { CommentUpdateForm } from '../components/organisms/CommentUpdateFormComponent'
import { ContentPopover } from '../components/organisms/ContentPopoverComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

interface ILocationState {
  autoFocus?: boolean
}

export const FeedDetailPage: React.FC<RouteComponentProps<{ id: string }, StaticContext, ILocationState>> = ({
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

  const onDelete = async (id: number) => {
    await $feed.deleteFeed(id)
    route.goBack()
  }

  const onEdit = async (id: number) => {
    await $feed.getFeedForm(id)
    route.feedForm()
  }

  const taskGroup = [$feed.getFeed, $comment.deleteComment]
  // eslint-disable-next-line
  const observableTaskGroup = TaskGroup<any[], void>(taskGroup)

  return useObserver(() => (
    <IonPage>
      <IonContent>
        <BackFloatingButton></BackFloatingButton>
        {observableTaskGroup.match({
          pending: () => <Spinner isFull={true}></Spinner>,
          resolved: () => (
            <FeedItem
              feed={$feed.feed}
              isDetail={true}
              onDelete={() => onDelete($feed.feed.id)}
              onEdit={() => onEdit($feed.feed.id)}
            ></FeedItem>
          ),
          rejected: () => {
            taskGroup.forEach((task) => task.reset())
            return <></>
          },
        })}
        <ContentPopover></ContentPopover>
      </IonContent>

      <IonFooter>
        {$comment.updateCommentId === null && (
          <CommentInsertForm feedId={id} autoFocus={location?.state?.autoFocus}></CommentInsertForm>
        )}
        {$comment.updateCommentId !== null && (
          <CommentUpdateForm commentId={$comment.updateCommentId} feedId={$feed.feed.id}></CommentUpdateForm>
        )}
      </IonFooter>
    </IonPage>
  ))
}
