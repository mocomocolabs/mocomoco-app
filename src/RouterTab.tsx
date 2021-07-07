import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Icon } from './components/atoms/IconComponent'
import { BottomTabMorePopover } from './components/molecules/BottomTabMorePopover'
import { useStore } from './hooks/use-store'
import { ChatPage } from './pages/ChatPage'
import { ChatRoomPage } from './pages/ChatRoomPage'
import { ClubDetailPage } from './pages/club/ClubDetailPage'
import { ClubFormPage } from './pages/club/ClubFormPage'
import { ClubPage } from './pages/club/ClubPage'
import { DevPage } from './pages/DevPage'
import { FeedDetailPage } from './pages/FeedDetailPage'
import { FeedFormPage } from './pages/FeedFormPage'
import { FeedPage } from './pages/FeedPage'
import { HomePage } from './pages/HomePage'
import { IntroPage } from './pages/IntroPage'
import { MyPage } from './pages/MyPage'
import { MyPageLikeList } from './pages/MyPageLikeList'
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

export enum TAB_PATH {
  HOME = '/tabs/home',
  FEED = '/tabs/feed',
  CHAT = '/tabs/chat',
  MY_PAGE = '/tabs/my-page',

  STUFF = '/tabs/stuff',
  CLUB = '/tabs/club',
  TALENT = '/tabs/talent',
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
    path: TAB_PATH.STUFF, // more 대표 STUFF로 셋팅
    icon: 'more',
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
const morePaths = [TAB_PATH.STUFF, TAB_PATH.TALENT, TAB_PATH.CLUB]

const publicPaths = [
  //
  '/dev',
  '/intro',
  '/sign-in',
  '/sign-up',
  '/sign-up/form',
  '/sign-up/community',
]

export const RouterTab: FC<IRouterTab> = ({ isShow, chatUnreadCount }) => {
  const [currentTab, setCurrentTab] = useState(TAB_PATH.HOME as string)
  const [showsMore, setShowsMore] = useState(false)
  const { $auth } = useStore()

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
    if (event.detail.tab === TAB.MORE.path) {
      setShowsMore(!showsMore)
    }
  }, [])

  const setActiveTabByPath = () => {
    switch (true) {
      case location.pathname.startsWith(TAB_PATH.HOME):
        setCurrentTab(TAB_PATH.HOME)
        break
      case location.pathname.startsWith(TAB_PATH.FEED):
        setCurrentTab(TAB_PATH.FEED)
        break
      case location.pathname.startsWith(TAB_PATH.CHAT):
        setCurrentTab(TAB_PATH.CHAT)
        break
      case location.pathname.startsWith(TAB_PATH.MY_PAGE):
        setCurrentTab(TAB_PATH.MY_PAGE)
        break
      case location.pathname.startsWith(TAB_PATH.STUFF):
        setCurrentTab(TAB_PATH.STUFF)
        break
      case location.pathname.startsWith(TAB_PATH.TALENT):
        setCurrentTab(TAB_PATH.TALENT)
        break
      case location.pathname.startsWith(TAB_PATH.CLUB):
        setCurrentTab(TAB_PATH.CLUB)
        break
    }
  }

  const routeGuard = useCallback(async (path) => {
    if (!$auth.isLogin && !publicPaths.includes(path)) {
      route.signUp()
    }
    if ($auth.isLogin && publicPaths.includes(path)) {
      route.home()
    }
  }, [])

  useEffect(() => {
    routeGuard(route.history.location.pathname)
    setActiveTabByPath()

    route.history.listen((v) => {
      setActiveTabByPath()
      routeGuard(v.pathname)
    })
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

            {/* Login 필요 */}
            {/* TABS */}
            <Route path='/tabs/home' component={HomePage} exact />

            <Route path='/tabs/feed' component={FeedPage} exact />
            <Route path='/tabs/feed/form' component={FeedFormPage} exact />
            <Route path='/tabs/feed/:id' component={FeedDetailPage} exact />

            <Route path='/tabs/stuff' component={StuffTalentPage} exact />
            <Route path='/tabs/stuff/form' component={StuffTalentFormPage} exact />
            <Route path='/tabs/stuff/:id' component={StuffTalentDetailPage} exact />

            <Route path='/tabs/talent' component={StuffTalentPage} exact />
            <Route path='/tabs/talent/form' component={StuffTalentFormPage} exact />
            <Route path='/tabs/talent/:id' component={StuffTalentDetailPage} exact />

            <Route path='/tabs/club' component={ClubPage} exact />
            <Route path='/tabs/club/form' component={ClubFormPage} exact />
            <Route path='/tabs/club/:id' component={ClubDetailPage} exact />

            <Route path='/tabs/chat' component={ChatPage} exact />
            <Route path='/tabs/chat/:id' component={ChatRoomPage} exact />

            <Route path='/tabs/my-page' component={MyPage} exact />
            <Route path='/tabs/my-page/my-list' component={MyPageMyList} exact />
            <Route path='/tabs/my-page/like-list' component={MyPageLikeList} exact />
            <Route path='/tabs/my-page/settings' component={SettingsPage} exact />

            {/* TABS 독립 */}
            <Route path='/users/:id' component={ProfileDetailPage} exact />
            <Route path='/users/:id/edit' component={ProfileUpdatePage} exact />

            <Redirect from='/' to='/tabs/home' exact />
          </IonRouterOutlet>
          <IonTabBar slot='bottom' hidden={!isShow} onIonTabsDidChange={onTabChange}>
            <IonTabButton tab={TAB.HOME.path} selected={currentTab === TAB_PATH.HOME} href='/tabs/home'>
              <Icon name={getTabIcon(TAB.HOME)}></Icon>
            </IonTabButton>
            <IonTabButton tab={TAB.FEED.path} selected={currentTab === TAB_PATH.FEED} href='/tabs/feed'>
              <Icon name={getTabIcon(TAB.FEED)}></Icon>
            </IonTabButton>
            <IonTabButton tab={TAB.MORE.path} className='no-active-color'>
              <Icon
                name={morePaths.includes(currentTab as TAB_PATH) ? TAB.MORE.icon + '-solid' : TAB.MORE.icon}
                className='icon-24'
              ></Icon>
            </IonTabButton>
            <IonTabButton tab={TAB.CHAT.path} selected={currentTab === TAB_PATH.CHAT} href='/tabs/chat'>
              <Icon name={getTabIcon(TAB.CHAT)}></Icon>
              {chatUnreadCount > 0 && <div className='badge'></div>}
            </IonTabButton>
            <IonTabButton
              tab={TAB.MY_PAGE.path}
              selected={currentTab === TAB_PATH.MY_PAGE}
              href='/tabs/my-page'
            >
              <Icon name={getTabIcon(TAB.MY_PAGE)}></Icon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <BottomTabMorePopover
        isOpen={showsMore}
        setIsOpen={setShowsMore}
        activeTab={currentTab as TAB_PATH}
      ></BottomTabMorePopover>
    </>
  )
}
