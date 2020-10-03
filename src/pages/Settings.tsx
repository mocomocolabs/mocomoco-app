import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import React, { useState } from 'react'
import { XDivider } from '../components/atoms/XDividerComponent'

export const Settings: React.FC = () => {
  const [alarmSound, setAlarmSound] = useState<string>('구름씨 랄라~')
  const [language, setLanguage] = useState<string>('한국어')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' color='dark' defaultHref='/my-page' />
          </IonButtons>
          <IonTitle slot='start'>마이페이지</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines='none'>
            <IonItemGroup>
              <IonItem>
                <IonLabel>쪽지, 댓글 알림</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked></IonToggle>
              </IonItem>
              <IonItem>
                <IonLabel>관심글, 관심주제 알림</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked></IonToggle>
              </IonItem>
              <IonItem>
                <IonLabel>홈화면에서 개인일정 보기</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked></IonToggle>
              </IonItem>
              <IonItem>
                <IonLabel>방해금지시간 설정</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off'></IonToggle>
              </IonItem>
              <IonItem>
                <IonLabel>진동</IonLabel>
                <IonToggle slot='end' name='chat_alarm_on_off' checked></IonToggle>
              </IonItem>
              <IonItem>
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
              <IonItem>
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

              <IonItem>
                <IonLabel>오픈소스 라이센스</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>버젼 정보</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>로그아웃</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>회원탈퇴</IonLabel>
              </IonItem>
            </IonItemGroup>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  )
}
