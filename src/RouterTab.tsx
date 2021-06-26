import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Icon } from './components/atoms/IconComponent'
import { GuardRoute } from './GuardRoute'
import { ChatPage } from './pages/ChatPage'
import { ChatRoomPage } from './pages/ChatRoomPage'
import { ClubDetailPage } from './pages/club/ClubDetailPage'
import { ClubFormPage } from './pages/club/ClubFormPage'
import { ClubPage } from './pages/club/ClubPage'
import { DevPage } from './pages/DevPage'
import { FeedDetailPage } from './pages/FeedDetailPage'
import { FeedPage } from './pages/FeedPage'
import { FeedWritePage } from './pages/FeedWritePage'
import { HomePage } from './pages/HomePage'
import { MyPage } from './pages/MyPage'
import { MyPageMyList } from './pages/MyPageMyList'
import { ProfileDetailPage } from './pages/ProfileDetailPage'
import { ProfileUpdatePage } from './pages/ProfileUpdatePage'
import { SettingsPage } from './pages/SettingsPage'
import { SignUpCommunityPage } from './pages/sign-up/SignUpCommunityPage'
import { SignUpFormPage } from './pages/sign-up/SignUpFormPage'
import { SignUpPage } from './pages/sign-up/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { StuffTalentFormPage } from './pages/StuffTalentFormPage'
import { StuffTalentPage } from './pages/StuffTalentPage'
import './RouterTab.scss'
import { route } from './services/route-service'
import { ValueOf } from './utils/type-util'

export interface IRouterTab {
  chatUnreadCount: number
  isShow: boolean
}

type ITab = { [key: string]: { path: string; icon: string } }
const TAB: ITab = {
  HOME: {
    path: 'home',
    icon: 'home',
  },
  FEED: {
    path: 'feed',
    icon: 'group',
  },
  MORE: {
    path: 'more',
    icon: 'send',
  },
  CHAT: {
    path: 'chat',
    icon: 'message',
  },
  MY_PAGE: {
    path: 'my-page',
    icon: 'setting',
  },
}

export const RouterTab: FC<IRouterTab> = ({ isShow, chatUnreadCount }) => {
  const [currentTab, setCurrentTab] = useState('')

  // eslint-disable-next-line
  const refTabbar = useRef<any>()

  const getTabName = useCallback(
    (tab: ValueOf<ITab>) => {
      const activeName = '-solid'
      return currentTab === tab.path ? tab.icon + activeName : tab.icon
    },
    [currentTab]
  )

  useEffect(() => {
    setCurrentTab(refTabbar.current?.ionTabContextState.activeTab)
  }, [])

  return (
    <IonReactRouter history={route.history}>
      <IonTabs ref={refTabbar}>
        <IonRouterOutlet id='main'>
          <Route path='/dev' component={DevPage} exact />
          <Route path='/sign-in' component={SignInPage} exact />
          <Route path='/sign-up' component={SignUpPage} exact />
          <Route path='/sign-up/community' component={SignUpCommunityPage} exact />
          <Route path='/sign-up/form' component={SignUpFormPage} exact />
          <GuardRoute path='/home' component={HomePage} exact />
          <GuardRoute path='/feed' component={FeedPage} exact />
          <GuardRoute path='/feed/:id' component={FeedDetailPage} exact />
          <GuardRoute path='/feed-write' component={FeedWritePage} exact />
          <GuardRoute path='/stuff' component={StuffTalentPage} exact />
          {/* <GuardRoute path='/stuff/:id' component={StuffTalentDetailPage} exact /> */}
          <GuardRoute path='/stuff-form' component={StuffTalentFormPage} exact />
          <GuardRoute path='/talent' component={StuffTalentPage} exact />
          {/* <GuardRoute path='/talent/:id' component={StuffTalentDetailPage} exact /> */}
          <GuardRoute path='/talent-form' component={StuffTalentFormPage} exact />
          <GuardRoute path='/club' component={ClubPage} exact />
          <GuardRoute path='/club-form' component={ClubFormPage} exact />
          <GuardRoute path='/club/:id' component={ClubDetailPage} exact />
          <GuardRoute path='/chat' component={ChatPage} exact />
          <GuardRoute path='/chat/:id' component={ChatRoomPage} exact />
          <GuardRoute path='/my-page' component={MyPage} exact />
          <GuardRoute path='/my-page/my-list' component={MyPageMyList} exact />
          <GuardRoute path='/my-page/like-list' component={MyPage} exact />
          <GuardRoute path='/settings' component={SettingsPage} exact />
          <GuardRoute path='/users/:id' component={ProfileDetailPage} exact />
          <GuardRoute path='/users/:id/edit' component={ProfileUpdatePage} exact />
          <Redirect from='/' to='/home' exact />
        </IonRouterOutlet>
        <IonTabBar
          slot='bottom'
          hidden={!isShow}
          onIonTabsDidChange={(event: { detail: { tab: string } }) => {
            setCurrentTab(event.detail.tab)

            if (event.detail.tab === 'more') {
              console.log('click more')
            }
          }}
        >
          <IonTabButton tab={TAB.HOME.path} href='/home'>
            <Icon name={getTabName(TAB.HOME)}></Icon>
          </IonTabButton>
          <IonTabButton tab={TAB.FEED.path} href='/feed'>
            <Icon name={getTabName(TAB.FEED)}></Icon>
          </IonTabButton>
          <IonTabButton
            tab={TAB.MORE.path}
            onClick={() => {
              console.log('123123')
            }}
          >
            <Icon name={getTabName(TAB.MORE)}></Icon>
          </IonTabButton>
          <IonTabButton tab={TAB.CHAT.path} href='/chat'>
            <Icon name={getTabName(TAB.CHAT)}></Icon>
            {chatUnreadCount > 0 && <div className='badge'></div>}
          </IonTabButton>
          {/* <IonTabButton tab='club' href='/club'>
      <IonIcon icon={people} />
    </IonTabButton> */}
          <IonTabButton tab={TAB.MY_PAGE.path} href='/my-page'>
            <Icon name={getTabName(TAB.MY_PAGE)}></Icon>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}
