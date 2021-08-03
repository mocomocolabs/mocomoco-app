import { Task } from 'mobx-task'
import { ReactElement } from 'react'
import { ISpinnerPosition } from '../atoms/SpinnerComponent'
import { TaskObserver } from '../molecules/TaskObserverComponent'

export const SpinnerWrapper = ({
  task,
  Submit,
  spinnerPosition = 'none',
}: {
  // eslint-disable-next-line
  task: Task<any, any>
  Submit: ReactElement
  spinnerPosition?: ISpinnerPosition
}): JSX.Element => (
  <TaskObserver taskTypes={task} spinnerPosition={spinnerPosition}>
    {() => Submit}
  </TaskObserver>
)
