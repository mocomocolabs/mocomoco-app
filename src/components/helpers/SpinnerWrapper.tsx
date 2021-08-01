import { Task } from 'mobx-task'
import { ReactElement } from 'react'
import { TaskObserver } from '../molecules/TaskObserverComponent'

export const SpinnerWrapper = ({
  task,
  Submit,
}: {
  // eslint-disable-next-line
  task: Task<any, any>
  Submit: ReactElement
}): JSX.Element => <TaskObserver taskTypes={task}>{() => Submit}</TaskObserver>
