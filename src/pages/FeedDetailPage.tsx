import { IonContent, IonPage } from '@ionic/react'
import { Observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { FeedItem } from '../components/molecules/FeedItemComponent'
import { TaskObserver } from '../components/molecules/TaskObserverComponent'
import { CommentInsertForm } from '../components/organisms/CommentInsertFormComponent'
import { CommentUpdateForm } from '../components/organisms/CommentUpdateFormComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'
import { IAutoFocusRouteParam, route } from '../services/route-service'

export const FeedDetailPage: React.FC = () => {
  const id = parseInt(useParams<{ id: string }>().id)
  const autoFocus = useHistory<IAutoFocusRouteParam>().location.state?.autoFocus

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
    await $feed.getUpdateForm(id)
    route.feedForm()
  }

  return (
    <IonPage>
      <IonContent>
        <BackFloatingButton />
        <TaskObserver taskTypes={[$feed.getFeed, $comment.deleteComment]} spinnerPosition='center'>
          {() => (
            <FeedItem
              feed={$feed.feed}
              isDetail={true}
              onDelete={() => onDelete($feed.feed.id)}
              onEdit={() => onEdit($feed.feed.id)}
            />
          )}
        </TaskObserver>
      </IonContent>

      <Footer>
        <Observer>
          {() =>
            $comment.updateCommentId === null ? (
              <CommentInsertForm feedId={id} autoFocus={autoFocus} />
            ) : (
              <CommentUpdateForm commentId={$comment.updateCommentId} feedId={$feed.feed.id} />
            )
          }
        </Observer>
      </Footer>
    </IonPage>
  )
}
