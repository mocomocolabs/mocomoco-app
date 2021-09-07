import { IonContent } from '@ionic/react'
import _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, Redirect, Route, Router, Switch } from 'react-router-dom'
import { Icon } from './components/atoms/IconComponent'
import { TabBarPopoverContents } from './components/molecules/TabBarPopoverContent'
import { Footer } from './components/organisms/FooterComponent'
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
import { SignUpIntroducePage } from './pages/sign-up/SignUpIntroducePage'
import { SignUpPage } from './pages/sign-up/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { StuffTalentDetailPage } from './pages/StuffTalentDetailPage'
import { StuffTalentFormPage } from './pages/StuffTalentFormPage'
import { StuffTalentPage } from './pages/StuffTalentPage'
import { TermPrivacyPage } from './pages/term/TermPrivacyPage'
import { TermUsePage } from './pages/term/TermUsePage'
import './RouterTab.scss'
import { route } from './services/route-service'
import { ValueOf } from './utils/type-util'

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
  '/sign-up/introduce',
  '/term/privacy',
  '/term/use',
]

const admissionPaths = [
  //
  '/intro',
  '/sign-in',
  '/sign-up',
  '/sign-up/form',
  '/sign-up/community',
  '/sign-up/introduce',
]

// App.tsx > Back button 리스너에서 사용함
export const cannotGoBackPaths = [TAB_PATH.HOME, '/intro', '/sign-up', '/sign-up/complete']

const routingInfo: { path: string; children: ReactElement; exact: boolean }[] = [
  { path: '/dev', children: <DevPage />, exact: true },
  { path: '/intro', children: <IntroPage />, exact: true },
  { path: '/sign-in', children: <SignInPage />, exact: true },
  { path: '/sign-up', children: <SignUpPage />, exact: true },
  { path: '/sign-up/form', children: <SignUpFormPage />, exact: true },
  { path: '/sign-up/community', children: <SignUpCommunityPage />, exact: true },
  { path: '/sign-up/introduce', children: <SignUpIntroducePage />, exact: true },
  { path: '/sign-up/complete', children: <SignUpCompletePage />, exact: true },
  { path: '/term/privacy', children: <TermPrivacyPage />, exact: true },
  { path: '/term/use', children: <TermUsePage />, exact: true },

  // Login 필요
  // TABS
  { path: `${TAB_PATH.HOME}`, children: <HomePage />, exact: true },
  { path: `${TAB_PATH.FEED}`, children: <FeedPage />, exact: true },
  { path: `${TAB_PATH.FEED}/form`, children: <FeedFormPage />, exact: true },
  { path: `${TAB_PATH.FEED}/:id(\\d+)`, children: <FeedDetailPage />, exact: true },

  { path: `${TAB_PATH.STUFF}`, children: <StuffTalentPage />, exact: true },
  { path: `${TAB_PATH.STUFF}/form`, children: <StuffTalentFormPage />, exact: true },
  { path: `${TAB_PATH.STUFF}/:id(\\d+)`, children: <StuffTalentDetailPage />, exact: true },

  { path: `${TAB_PATH.TALENT}`, children: <StuffTalentPage />, exact: true },
  { path: `${TAB_PATH.TALENT}/form`, children: <StuffTalentFormPage />, exact: true },
  { path: `${TAB_PATH.TALENT}/:id(\\d+)`, children: <StuffTalentDetailPage />, exact: true },

  { path: `${TAB_PATH.CLUB}`, children: <ClubPage />, exact: true },
  { path: `${TAB_PATH.CLUB}/form`, children: <ClubFormPage />, exact: true },
  { path: `${TAB_PATH.CLUB}/:id(\\d+)`, children: <ClubDetailPage />, exact: true },

  { path: `${TAB_PATH.CHAT}`, children: <ChatPage />, exact: true },
  { path: `${TAB_PATH.CHAT}/:id(\\d+)`, children: <ChatRoomPage />, exact: true },

  { path: `${TAB_PATH.MY_PAGE}`, children: <MyPage />, exact: true },
  { path: `${TAB_PATH.MY_PAGE}/my-list`, children: <MyPageMyList />, exact: true },
  { path: `${TAB_PATH.MY_PAGE}/like-list`, children: <MyPageLikeList />, exact: true },
  { path: `${TAB_PATH.MY_PAGE}/settings`, children: <SettingsPage />, exact: true },

  // TABS 독립
  { path: '/users/:id(\\d+)', children: <ProfileDetailPage />, exact: true },
  { path: '/users/:id(\\d+)/edit', children: <ProfileUpdatePage />, exact: true },
]

export const RouterTab: FC = () => {
  const [currentTab, setCurrentTab] = useState(TAB_PATH.HOME as string)
  const { $auth, $ui, $chat } = useStore()

  const renderredRoutes = useMemo(
    () =>
      routingInfo.map((r) => (
        <Route key={r.path} path={r.path} exact={r.exact}>
          {r.children}
        </Route>
      )),
    []
  )

  const getTabIcon = useCallback(
    (tab: ValueOf<ITab>) => {
      const activepath = '-solid'
      return currentTab === tab.path ? tab.icon + activepath : tab.icon
    },
    [currentTab]
  )

  const onTabClick = useCallback(
    (path: TAB_PATH) => {
      path === TAB.MORE.path &&
        $ui.showPopover({
          cssClass: 'tab-bar-popover',
          animated: true,
          showBackdrop: false,
          children: (
            <TabBarPopoverContents hidePopover={$ui.hidePopover} activeTab={currentTab as TAB_PATH} />
          ),
        })
    },
    [currentTab]
  )

  const setActiveTabByPath = useCallback(() => {
    const found = _.find(TAB_PATH, (tab_path) => tab_path === location.pathname)
    found && setCurrentTab(found)
  }, [])

  const routeGuard = useCallback(async (path) => {
    if (!$auth.isLogin && !publicPaths.includes(path)) {
      route.signUp()
    }
    if ($auth.isLogin && admissionPaths.includes(path)) {
      route.home()
    }
  }, [])

  const renderredTabs = useMemo(
    () =>
      _.map(TAB, (tab) =>
        tab.path === TAB.MORE.path ? (
          <div key={tab.path} onClick={() => onTabClick(TAB.MORE.path)}>
            <Icon
              name={
                $ui.popover.isOpen || morePaths.includes(currentTab as TAB_PATH)
                  ? TAB.MORE.icon + '-solid'
                  : TAB.MORE.icon
              }
              className={`${morePaths.includes(currentTab as TAB_PATH) ? 'active-style' : 'no-active-style'}`}
              size={28}
            />
          </div>
        ) : (
          <NavLink key={tab.path} to={tab.path} onClick={() => onTabClick(tab.path)}>
            <Icon
              name={getTabIcon(tab)}
              className={currentTab === tab.path ? 'active-style' : 'no-active-style'}
            />
            {tab === TAB.CHAT && (
              <Observer>{() => <div hidden={$chat.unReadCountAll <= 0} className='badge' />}</Observer>
            )}
          </NavLink>
        )
      ),
    [currentTab]
  )

  useEffect(() => {
    routeGuard(route.history.location.pathname)
    setActiveTabByPath()

    const dismissListen = route.history.listen((v) => {
      routeGuard(v.pathname)
      setActiveTabByPath()
    })

    return () => dismissListen()
  }, [])

  return (
    <>
      <Router history={route.history}>
        <IonContent>
          <Switch>
            {renderredRoutes}
            <Redirect to='/tabs/home' />
          </Switch>
        </IonContent>

        <Observer>
          {() => (
            <Footer hidden={!$ui.isBottomTab}>
              {/* TODO 이 부분도 info 객체로 분리하자 */}
              {renderredTabs}
            </Footer>
          )}
        </Observer>
      </Router>
    </>
  )
}
