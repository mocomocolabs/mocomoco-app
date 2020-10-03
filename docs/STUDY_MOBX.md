# mobx

## observable의 종류

observable의 값이 변화하면 컴포넌트에서 rerendering 합니다.

https://rannte.tistory.com/entry/react-native-mobx-action-observable

- observable.ref
  가장 얕은 추적

```typescript
class Store {
  @observable.ref collection = []

  @action editCollection = () => {
    // 참조가 변경되었기 때문에 전달한다. (새로운 배열을 참조)
    this.collection = [{ name: 'myName' }]
    // 참조가 그대로 이기때문에 전달하지 않는다.
    this.collection[0] = { name: 'myName' }
  }
}
```

- observable.shallow
  1단계까지 추적, 변경이 전달, 참조 변경에 대해서도 전달

```typescript
class Store {
  @observable.shallow user = {
    name: 'myName',
    friends: [{ name: 'firendName' }],
  }
  @action editUser = () => {
    // 1계단째 이기때문에 전달한다.
    this.user.name = 'newName'
    // 2계단 이상 차이 나기때문에 전달하지 않는다.
    this.user.friends[0].name = 'newFriendName'
    // 참조가 변경되었기 때문에 전달한다.
    this.user = {
      name: 'myName',
      friends: [{ name: 'newFriendName' }],
    }
  }
}
```

- (기본값) observable.deep
  단계에 상관없이 추적/변경, 기본동작.
  observable === observable.deep

```typescript
class Store {
  @observable user = {
    name: 'myName',
    friends: [{ name: 'firendName' }],
  }
  @action editUser = () => {
    // 전달한다 (1번만)
    this.user.friends[0].name = 'newFriendName'
    // 전달한다. (3번이나)
    this.user = { name: 'myName', friends: [{ name: 'newFriendName' }] }
  }
}
```

아래의 경우와 같이 react에서 3번이나 re-rendering되므로 주의 필요

- this.user.name
- this.user.friends
- this.user.friends[0]

- observable.struct
  deep 처럼 하위 요소를 모두 추적하지만, 참조에 변화가 있더라도
  값에 변화가 없는 요소에 대해서는 변경을 전달하지 않는다.
  render 호출 횟수를 deep과 비교해보자.

## computed

observable은 값이 변경될때마다 무조건 렌더링을 다시 하지만, computed는 계산된 값을 캐싱해서 사용하기 때문에
observable값이 변경되더라도 필요한 경우에만 계산을 한다.
@computed 내부의 동작이 무거울 수록 성능상 이점이 더 커진다.

Computed는 기본적으로 JavaScript의 Getter에만 사용할 수 있으며, 따라서 추가 인자를 받을 수가 없다. 입력 인자가 this로 제한되는 순수함수라고 생각하면 이해하기 편하다. (물론 순수함수는 아니다.)

https://hyunseob.github.io/2017/10/07/hello-mobx/

## reaction vs autorun vs when

- Autorun
  함수 내부에서 참조하는 observable 변수에 변화가 생기면, 파라미터로 넘긴 함수를 실행

```typescript
import { autorun, observable } from 'mobx'

class User {
  @observable name = ''
}

const user = new User()

autorun(() => {
  console.log(`Hello, ${user.name}`)
})

user.name = 'Camel'
```

> 결과
> Hello,
> Hello, Camel

위와 같이 초기값 또한 실행된다.

- Reaction
  autorun이 초기화를 포함한 모든 단계에 반응한다면, reaction은 초기화 이후부터 반영

```typescript
import { observable, reaction, when } from 'mobx'

class User {
  @observable name = ''
}

const user = new User()

reaction(
  () => user.name,
  (name) => {
    console.log(`Hello, ${name}`)
  }
)

user.name = 'Camel'
```

> 결과
> Hello, Camel

- When
  첫번째 인자로 boolean값을 반환하는 함수, 두번째 인자로 실행할 함수를 선언. 첫번째 인자의 리턴값이 true가 되는 순간, 두번째 함수가 단 한번만 실행되고 이후 변화에는 반응하지 않는다.

```typescript
import { observable, when } from 'mobx'

class User {
  @observable name = ''
}

const user = new User()

when(
  () => user.name.length > 0,
  () => {
    console.log(`Hello, ${user.name}`)
  }
)

user.name = 'Camel'
user.name = 'Caramel'
```

> 결과
> Hello, Camel

https://camel-dev.blogspot.com/2018/06/mobx1-observable-reactions.html

## action

- action은 state를 변화시키는 모든 것들
- 변화를 한다발로 묶어 computed value와 reaction들에게 가장 마지막 action이 끝난 후에 통지한다.
- action.bound는 자동으로 action 대상 객체에 대한 this를 바인딩함

### action 함수를 선언했는데도 state를 변화시키면 에러가 나는 경우

```typescript
mobx.configure({ enforceActions: 'observed' }) // action 밖에서 state 수정을 비허용한다

class Store {
  @observable githubProjects = []
  @observable state = 'pending' // "pending" / "done" / "error"

  @action
  fetchProjects() {
    // 오류나지 않음
    this.githubProjects = []
    this.state = 'pending'
    fetchGithubProjectsSomehow().then(
      (projects) => {
        const filteredProjects = somePreprocessing(projects)
        // 오류 발생
        this.githubProjects = filteredProjects
        this.state = 'done'
      },
      (error) => {
        // 오류 발생
        this.state = 'error'
      }
    )
  }
}
```

then 다음 화살표 함수 안에서, 새로운 함수스코프가 만들어지고, 그곳에서 action 값을 바꾸는데, 이것은 액션 밖에서 state값을 바꾼다고 인식한다.

- 해결방법 1 : 각각 별도의 action 함수를 만든다.

```typescript
  @action
  fetchProjects() {
    this.githubProjects = []
    this.state = 'pending'
    fetchGithubProjectsSomehow().then(
      (projects) => {
        const filteredProjects = somePreprocessing(projects)
        this.setGithubProjects(filteredProjects)
        this.setState('done')
      },
      (error) => {
        this.setState('error')
      }
    )
  }

  @action
  setGithubProjects(p: any) {
    this.githubProjects = p
  }

  @action
  setState(state: string) {
    this.state = state
  }
```

- 해결방법 2 : runInAction 유틸함수를 이용한다.

```typescript
  import { runInAction } from 'mobx'

  @action
  fetchProjects() {
    this.githubProjects = []
    this.state = 'pending'
    fetchGithubProjectsSomehow().then(
      (projects) => {
        const filteredProjects = somePreprocessing(projects)
        runInAction(() => {
          this.githubProjects = filteredProjects
          this.state = 'done'
        })
      },
      (error) => {
        runInAction(() => {
          this.githubProjects = filteredProjects
          this.state = 'error'
        })
      }
    )
  }

```

# mobx-task

- mobx-task의 초기값 변경

mobx-task의 초기 state는 `pending` 이다. 초기 state를 바꾸려면 아래와 같이 해준다.

```typescript
  @task.resolved // .resolved를 붙이면 초기 state가 resolved가 된다.
  insertComment = (async ({ feedId, content }: IInsertComment) => {
    await new Promise((r) => setTimeout(() => r(), 1000))
    await http.post(`/feeds/${feedId}/comment`, { content }).then(() => this.getFeed(feedId))
  }) as InsertCommentTask
```

아래 코드는 원래 최초에 `Spinner`가 보이지만, `@task.resolved`를 사용하면 최초에 `Spinner` 가 보이지 않는다.

```javascript
{
  feed.insertComment.match({
    pending: () => <Spinner></Spinner>,
    resolved: () => (
      <IonIcon
        icon={paperPlane}
        className='black'
        onClick={() => {
          if (text) {
            feed.insertComment({ feedId, content: text })
            setText('')
          }
        }}
      ></IonIcon>
    ),
  })
}
```
