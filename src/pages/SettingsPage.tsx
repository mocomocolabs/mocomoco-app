import { App as AppPlugin } from '@capacitor/app'
import {
  IonContent,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { XDivider } from '../components/atoms/XDividerComponent'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

export const SettingsPage: React.FC = () => {
  const [alarmSound, setAlarmSound] = useState<string>('구름씨 랄라~')
  const [language, setLanguage] = useState<string>('한국어')
  const [versionName, setVersionName] = useState<string>('')

  const { $auth, $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  useEffect(() => {
    const getVersionName = async () => {
      try {
        const appInfo = await AppPlugin.getInfo()
        setVersionName(appInfo.version)
      } catch (e) {
        console.log(e, '=> ignored')
      } finally {
        console.log('getVersionName called')
      }
    }

    getVersionName()
  }, [])

  return (
    <IonPage>
      <Header start={<BackButton type='close' />} center='설정' />
      <IonContent>
        <div className='px-container'>
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
                <IonLabel>계정 정보</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>버젼 정보</IonLabel>
                <IonNote slot='end' color='secondary'>
                  {versionName}
                </IonNote>
              </IonItem>

              <IonItem onClick={() => route.termUse()}>
                <IonLabel>이용약관</IonLabel>
              </IonItem>

              <IonItem onClick={() => route.termPrivacy()}>
                <IonLabel>개인정보 처리방침</IonLabel>
              </IonItem>

              <IonItem disabled>
                <IonLabel>오픈소스 라이센스</IonLabel>
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
