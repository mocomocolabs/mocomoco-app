import { useObserver } from 'mobx-react-lite'
import { TaskGroup } from 'mobx-task'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { executeWithError } from '../../utils/http-helper-util'
import { Icon } from '../atoms/IconComponent'
import { Pad } from '../atoms/PadComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { TextBase } from '../atoms/TextBaseComponent'

export const SignUpCommunity: FC = () => {
  const { $community, $auth } = useStore()

  const taskGroup = [$auth.signUp, $auth.signIn]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const observableTaskGroup = TaskGroup<any[], void | boolean>(taskGroup)

  return useObserver(() => (
    <>
      <ul className='px-container pt-2'>
        {$community.communities.map((v) => (
          <li
            key={v.id}
            className='py-2'
            onClick={() => {
              $community.setSelectedId(v.id)
              $auth.setSignUpForm({ communityIds: [v.id] })
            }}
          >
            <div className='flex-between-center'>
              <TextBase className='gray'>{v.name}</TextBase>
              {v.id === $community.selectedId && <Icon name='check-solid' className='icon-secondary'></Icon>}
            </div>
          </li>
        ))}
      </ul>

      <Pad className='height-50'></Pad>

      {observableTaskGroup.match({
        pending: () => <Spinner></Spinner>,
        resolved: () => (
          <SubmitButton
            disabled={!$community.selectedId}
            text='가입하기'
            onClick={() => {
              executeWithError(async () => {
                await $auth.signUp($auth.signUpForm)
                await $auth.signIn($auth.signUpForm.email!, $auth.signUpForm.password!)
                route.signUpComplete()
              })
            }}
          ></SubmitButton>
        ),
        rejected: () => {
          taskGroup.forEach((task) => task.reset())
          return <></>
        },
      })}
    </>
  ))
}
