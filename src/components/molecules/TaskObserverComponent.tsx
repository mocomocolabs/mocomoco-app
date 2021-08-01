import { Observer } from 'mobx-react-lite'
import { Task, TaskGroup } from 'mobx-task'
import { FC, ReactElement } from 'react'
import { ISpinnerPosition, Spinner } from '../atoms/SpinnerComponent'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ITaskObserver {
  taskTypes: Task<any, any> | Task<any, any>[]
  spinnerPosition?: ISpinnerPosition
  children: () => ReactElement
}

export const TaskObserver: FC<ITaskObserver> = ({ taskTypes, spinnerPosition, children }) => {
  const taskArray = ([] as Task<any, any>[]).concat(taskTypes)
  const observableTaskGroup = TaskGroup<any[], any>(taskArray)
  /* eslint-enable */

  return (
    <Observer>
      {() =>
        observableTaskGroup.match({
          pending: () => <Spinner position={spinnerPosition} />,
          resolved: children,
          rejected: () => {
            taskArray.forEach((t) => t.reset())
            return <></>
          },
        })
      }
    </Observer>
  )
}
