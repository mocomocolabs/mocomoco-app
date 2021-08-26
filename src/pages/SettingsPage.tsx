import {
  IonContent,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/react'
import { useState } from 'react'
import { XDivider } from '../components/atoms/XDividerComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'

export const SettingsPage: React.FC = () => {
  const [alarmSound, setAlarmSound] = useState<string>('구름씨 랄라~')
  const [language, setLanguage] = useState<string>('한국어')

  const { $auth, $ui } = useStore()

  return (
    <IonPage>
      <Header start={<BackButton type='close' />} center='설정' />
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines='none'>
            <IonItemGroup>
              <IonItem disabled>
                <IonLabel>채팅 알림</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked />
              </IonItem>
              <IonItem disabled>
                <IonLabel>댓글 알림</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked />
              </IonItem>
              <IonItem disabled>
                <IonLabel>방해금지시간 설정</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' />
              </IonItem>
              <IonItem disabled>
                <IonLabel>진동</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked />
              </IonItem>
              <IonItem disabled>
                <IonLabel>알림음</IonLabel>
                <IonSelect
                  interface='action-sheet'
                  value={alarmSound}
                  placeholder={alarmSound}
                  onIonChange={(e) => {
                    setAlarmSound(e.detail.value)
                  }}
                >
                  <IonSelectOption value='구름씨 랄라~'>구름씨 랄라~</IonSelectOption>
                  <IonSelectOption value='구름씨 롤롤로~'>구름씨 롤롤로~</IonSelectOption>
                  <IonSelectOption value='구름씽씽~'>구름씽씽~</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonItemGroup>

            <XDivider />

            <IonItemGroup>
              <IonItem disabled>
                <IonLabel>언어</IonLabel>
                <IonSelect
                  interface='action-sheet'
                  value={language}
                  placeholder={language}
                  onIonChange={(e) => {
                    setLanguage(e.detail.value)
                  }}
                >
                  <IonSelectOption value='한국어'>한국어</IonSelectOption>
                  <IonSelectOption value='English'>English</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem disabled>
                <IonLabel>오픈소스 라이센스</IonLabel>
              </IonItem>
              <IonItem disabled>
                <IonLabel>버젼 정보</IonLabel>
              </IonItem>
              <IonItem
                onClick={() =>
                  $ui.showAlert({
                    message: '로그아웃하시겠어요?',
                    onSuccess: () => $auth.signOut(),
                  })
                }
              >
                <IonLabel>로그아웃</IonLabel>
              </IonItem>
              <IonItem disabled>
                <IonLabel>회원탈퇴</IonLabel>
              </IonItem>
            </IonItemGroup>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
