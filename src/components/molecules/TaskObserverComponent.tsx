import { Observer } from 'mobx-react-lite'
import { Task } from 'mobx-task'
import { FC, ReactElement } from 'react'
import { Spinner } from '../atoms/SpinnerComponent'

interface ITaskObserver {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskType: Task<any, any>
  children: () => ReactElement
}

export const TaskObserver: FC<ITaskObserver> = ({ taskType, children }) => (
  <Observer>
    {() =>
      taskType.match({
        pending: () => <Spinner position='centerX' />,
        resolved: children,
        rejected: () => {
          taskType.reset()
          return <></>
        },
      })
    }
  </Observer>
)
