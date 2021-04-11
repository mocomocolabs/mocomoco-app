import { useObserver } from 'mobx-react-lite'
import { TaskMethods } from 'mobx-task'
import { Spinner } from '../atoms/SpinnerComponent'

export const SpinnerWrapper = ({ task, Submit }: { task: TaskMethods<any, any>; Submit: any }): JSX.Element =>
  useObserver(() =>
    task.match({
      pending: () => <Spinner></Spinner>,
      resolved: () => <Submit></Submit>,
      rejected: () => {
        task.reset()
        return <></>
      },
    })
  )
