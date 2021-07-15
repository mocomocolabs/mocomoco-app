import { useObserver } from 'mobx-react-lite'
import { TaskMethods } from 'mobx-task'
import { ReactElement } from 'react'
import { Spinner } from '../atoms/SpinnerComponent'

export const SpinnerWrapper = ({
  task,
  Submit,
}: {
  // eslint-disable-next-line
  task: TaskMethods<any, any>
  Submit: ReactElement
}): JSX.Element =>
  useObserver(() =>
    task.match({
      pending: () => <Spinner></Spinner>,
      resolved: () => Submit,
      rejected: () => {
        task.reset()
        return <></>
      },
    })
  )
