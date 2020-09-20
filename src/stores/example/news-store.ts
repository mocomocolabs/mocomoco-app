import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { INews } from '../../models/example/news'
import { http } from '../../utils/http-util'
import { Task } from '../task'

const initState = {
  news: [],
  query: '',
}

export class News {
  @observable.shallow news: INews[] = initState.news
  @observable query = initState.query

  // 아래코드는 에러가 난다. 우선 STUDY_MOBX.md 파일의
  // 'action을 선언했는데도 state를 변화시키면 에러가 나는 경우' 를 읽고 오자
  // axios.then에서 또 하나의 함수를 생성하고 있고, 그 안에서 state를 변화시키기 때문에 에러가 나는 것이다.
  // 해결 하기 위해서는 STUDY_MOBX.md 파일의 설명과 같이 runInAction을 쓰거나, news를 셋팅하는 action 함수를 만든다
  //
  // @action
  // getNews = async () => {
  //   await new Promise((r) => setTimeout(() => r(), 1000))

  //   await axios.get('https://api.hnpwa.com/v0/news/1.json').then(({ data }) => {
  //     this.news = data
  //   })
  // }

  // @task 는 mobx-task라는 라이브러리가 제공하는 데코레이터다.
  // 아래와 같이 화살표 함수를 가로로 묶고 as Task라고 타입을 지정해 주면 된다.
  // (() => {}) as Task
  // task는 api 호출시에 쓰면 아래와 같은 기능이 있어 유용하다.
  // 1) runInAction기능: Task 내부의 함수에서는 state를 변화시켜도 오류가 나지 않는다.
  // 2) NewsList.tsx를 보면 news.getNews에 match라는 함수를 자동으로 바인딩해주는데
  // match 함수를 통해 api호출 상태(pending, resolved, rejected)에 맞는 컴포넌트를 그려줄 수 있다.
  @task
  getNews = (async () => {
    await new Promise((r) => setTimeout(() => r(), 1000))

    await http.get<INews[]>('https://api.hnpwa.com/v0/news/1.json').then(
      action((data) => {
        this.news = data
      })
    )
  }) as Task

  @action
  setQuery = (_query: string) => {
    this.query = _query
  }

  // computed를 사용하면, 컴포넌트 내 가독성도 좋아지고, 계산된 값을 캐싱하기 때문에 성능상의 이점도 있다!
  @computed
  get filteredNews(): INews[] {
    return this.news.filter((v) => v.title.includes(this.query))
  }
}
