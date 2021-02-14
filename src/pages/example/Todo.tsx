import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useParams } from 'react-router'
import { TodoList } from '../../components/_example/TodoList'
import { TodoNew } from '../../components/_example/TodoNew'

export const Todo: React.FC = () => {
  const { name } = useParams<{ name: string }>()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='p-2'>
          <TodoNew />
          <TodoList />
        </div>
      </IonContent>
    </IonPage>
  )
}
