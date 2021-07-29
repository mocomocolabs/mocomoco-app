import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from '../components/atoms/SpinnerComponent'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { FeedItem } from '../components/molecules/FeedItemComponent'
import { CommentInsertForm } from '../components/organisms/CommentInsertFormComponent'
import { CommentUpdateForm } from '../components/organisms/CommentUpdateFormComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

interface ILocationState {
  autoFocus?: boolean
}

export const FeedDetailPage: React.FC = () => {
  const id = parseInt(useParams<{ id: string }>().id)
  const autoFocus = useHistory<ILocationState>().location.state?.autoFocus

  const { $feed, $ui, $comment } = useStore()

  useEffect(() => {
    // TODO : 게시글 접근제한 테스트 필요
    $ui.setIsBottomTab(false)
    $feed.getFeed(id)
    $comment.setUpdateCommentId(null)
  }, [])

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
      </IonContent>

      <Footer>
        {$comment.updateCommentId === null && (
          <CommentInsertForm feedId={id} autoFocus={autoFocus}></CommentInsertForm>
        )}
        {$comment.updateCommentId !== null && (
          <CommentUpdateForm commentId={$comment.updateCommentId} feedId={$feed.feed.id}></CommentUpdateForm>
        )}
      </Footer>
    </IonPage>
  ))
}
