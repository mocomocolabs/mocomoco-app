import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Icon } from './components/atoms/IconComponent'
import { BottomTabMorePopover } from './components/molecules/BottomTabMorePopover'
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
import { IntroPage } from './pages/IntroPage'
import { MyPage } from './pages/MyPage'
import { MyPageMyList } from './pages/MyPageMyList'
import { ProfileDetailPage } from './pages/ProfileDetailPage'
import { ProfileUpdatePage } from './pages/ProfileUpdatePage'
import { SettingsPage } from './pages/SettingsPage'
import { SignUpCommunityPage } from './pages/sign-up/SignUpCommunityPage'
import { SignUpCompletePage } from './pages/sign-up/SignUpCompletePage'
import { SignUpFormPage } from './pages/sign-up/SignUpFormPage'
import { SignUpPage } from './pages/sign-up/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { StuffTalentDetailPage } from './pages/StuffTalentDetailPage'
import { StuffTalentFormPage } from './pages/StuffTalentFormPage'
import { StuffTalentPage } from './pages/StuffTalentPage'
import './RouterTab.scss'
import { route } from './services/route-service'
import { ValueOf } from './utils/type-util'

export interface IRouterTab {
  chatUnreadCount: number
  isShow: boolean
}

enum TAB_PATH {
  HOME = 'home',
  FEED = 'feed',
  MORE = 'more',
  CHAT = 'chat',
  MY_PAGE = 'my-page',
}
type ITab = { [key: string]: { path: TAB_PATH; icon: string } }
const TAB: ITab = {
  HOME: {
    path: TAB_PATH.HOME,
    icon: 'home',
  },
  FEED: {
    path: TAB_PATH.FEED,
    icon: 'group',
  },
  MORE: {
    path: TAB_PATH.MORE,
    icon: 'send',
  },
  CHAT: {
    path: TAB_PATH.CHAT,
    icon: 'message',
  },
  MY_PAGE: {
    path: TAB_PATH.MY_PAGE,
    icon: 'setting',
  },
}
export type IMoreTabName = 'stuff' | 'talent' | 'club' | ''

export const RouterTab: FC<IRouterTab> = ({ isShow, chatUnreadCount }) => {
  const [currentTab, setCurrentTab] = useState('')
  const [showsMore, setShowsMore] = useState(false)
  const [isActiveMore, setIsActiveMore] = useState(false)
  const [moreTabName, setMoreTabName] = useState<IMoreTabName>('')

  // eslint-disable-next-line
  const refTabbar = useRef<any>()

  const getTabIcon = useCallback(
    (tab: ValueOf<ITab>) => {
      const activepath = '-solid'
      return currentTab === tab.path ? tab.icon + activepath : tab.icon
    },
    [currentTab]
  )

  const onTabChange = useCallback((event: { detail: { tab: string } }) => {
    setCurrentTab(event.detail.tab)
    setActiveMoreByPath()

    if (event.detail.tab === 'more') {
      setShowsMore(!showsMore)
    }

    // eslint-disable-next-line
  }, [])

  const setActiveMoreByPath = () => {
    const activeTab: IMoreTabName =
      (['club', 'talent', 'stuff'] as IMoreTabName[]).find((v) => location.pathname.includes(v)) || ''

    setIsActiveMore(!!activeTab)
    setMoreTabName(activeTab)
  }

  route.history.listen(() => {
    setActiveMoreByPath()
  })

  useEffect(() => {
    setCurrentTab(refTabbar.current?.ionTabContextState.activeTab)
    setActiveMoreByPath()
  }, [])

  return (
    <>
      <IonReactRouter history={route.history}>
        <IonTabs ref={refTabbar}>
          <IonRouterOutlet id='main'>
            <Route path='/dev' component={DevPage} exact />
            <Route path='/intro' component={IntroPage} exact />
            <Route path='/sign-in' component={SignInPage} exact />
            <Route path='/sign-up' component={SignUpPage} exact />
            <Route path='/sign-up/form' component={SignUpFormPage} exact />
            <Route path='/sign-up/community' component={SignUpCommunityPage} exact />
            <Route path='/sign-up/complete' component={SignUpCompletePage} exact />
            <GuardRoute path='/home' component={HomePage} exact />
            <GuardRoute path='/feed' component={FeedPage} exact />
            <GuardRoute path='/feed/:id' component={FeedDetailPage} exact />
            <GuardRoute path='/feed-write' component={FeedWritePage} exact />
            <GuardRoute path='/stuff' component={StuffTalentPage} exact />
            <GuardRoute path='/stuff/:id' component={StuffTalentDetailPage} exact />
            <GuardRoute path='/stuff-form' component={StuffTalentFormPage} exact />
            <GuardRoute path='/talent' component={StuffTalentPage} exact />
            <GuardRoute path='/talent/:id' component={StuffTalentDetailPage} exact />
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
          <IonTabBar slot='bottom' hidden={!isShow} onIonTabsDidChange={onTabChange}>
            <IonTabButton tab={TAB.HOME.path} href='/home'>
              <Icon name={getTabIcon(TAB.HOME)}></Icon>
            </IonTabButton>
            <IonTabButton tab={TAB.FEED.path} href='/feed'>
              <Icon name={getTabIcon(TAB.FEED)}></Icon>
            </IonTabButton>
            <IonTabButton tab={TAB.MORE.path} selected={isActiveMore}>
              <Icon name={isActiveMore ? TAB.MORE.icon + '-solid' : TAB.MORE.icon}></Icon>
            </IonTabButton>
            <IonTabButton tab={TAB.CHAT.path} href='/chat'>
              <Icon name={getTabIcon(TAB.CHAT)}></Icon>
              {chatUnreadCount > 0 && <div className='badge'></div>}
            </IonTabButton>
            <IonTabButton tab={TAB.MY_PAGE.path} href='/my-page'>
              <Icon name={getTabIcon(TAB.MY_PAGE)}></Icon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <BottomTabMorePopover
        isOpen={showsMore}
        setIsOpen={setShowsMore}
        activeTab={moreTabName}
      ></BottomTabMorePopover>
    </>
  )
}
