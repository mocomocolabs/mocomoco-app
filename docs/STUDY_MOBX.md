# mobx

## observable의 종류

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

## computed

observable은 값이 변경될때마다 무조건 렌더링을 다시 하지만, 실제 사용할 값을 computed해놓고 사용한다면, observable값이 변경되더라도 computed에 명시된 값에 부합하지 않다면 재 렌더링 하지 않는다.

https://jaroinside.tistory.com/39

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

https://chchoing88.github.io/ho_blog/hello-mobx/

- action은 state를 변화시키는 모든 것들
- 변화를 한다발로 묶어 computed value와 reaction들에게 가장 마지막 action이 끝난 후에 통지한다.
- action.bound는 자동으로 action 대상 객체에 대한 this를 바인딩함

### example

`mobx.configure({ enforceActions: 'observed' })` 선언후 해당 코드는 에러가 난다.

```typescript
mobx.configure({ enforceActions: 'observed' }) // don't allow state modifications outside actions

class Store {
  @observable githubProjects = []
  @observable state = 'pending' // "pending" / "done" / "error"

  @action
  fetchProjects() {
    this.githubProjects = []
    this.state = 'pending'
    fetchGithubProjectsSomehow().then(
      (projects) => {
        const filteredProjects = somePreprocessing(projects)
        this.githubProjects = filteredProjects
        this.state = 'done'
      },
      (error) => {
        this.state = 'error'
      }
    )
  }
}
```

then 다음 화살표 함수 안에서, 새로운 함수스코프가 만들어지고, 그곳에서 action 값을 바꾸는데, 이것은 액션 밖에서 state값을 바꾼다고 인식한다.

- 해결방법으로는 runInAction과 같은 유틸함수를 이용할 수 있다.
- https://mobx.js.org/best/actions.html 를 참고할것
