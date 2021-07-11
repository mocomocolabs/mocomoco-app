import { useObserver } from 'mobx-react-lite'
import { TaskMethods } from 'mobx-task'
import { ReactElement } from 'react'
import { Spinner } from '../atoms/SpinnerComponent'

// eslint-disable-next-line
export const SpinnerWrapper = ({
  task,
  Submit,
}: {
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
