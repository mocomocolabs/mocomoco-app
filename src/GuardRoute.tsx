import { useObserver } from 'mobx-react-lite'
import { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useStore } from './hooks/use-store'

export interface IGuardRoute {
  // eslint-disable-next-line
  component: React.FC<any>
  path: string
  exact: boolean
}

export const GuardRoute: FC<IGuardRoute> = ({ component, path, exact }: IGuardRoute) => {
  const { $auth } = useStore()

  return useObserver(() =>
    $auth.isLogin === true ? (
      <Route path={path} exact={exact} component={component} />
    ) : (
      <Redirect to='/sign-in'></Redirect>
    )
  )
}
