import _ from 'lodash'
import { IGoDetailRouteParam, route } from '../services/route-service'
import { IStuffTalentPredefined } from '../stores/stufftalent-store'
import { IStuffTalentDto, IStuffTalentLikeUserDto } from '../stores/stufftalent-store.d'
import { IStuffTalent, StuffTalentPageKey, StuffTalentStatus, StuffTalentType } from './stufftalent.d'

export interface StuffTalent extends IStuffTalent {}

export class StuffTalent {
  static of(payload: IStuffTalentDto, predefined: IStuffTalentPredefined, loginUserId: number) {
    return Object.assign(new StuffTalent(), {
      ...payload,
      likeCount: (
        payload[predefined.stuffTalentUsersProperty as keyof IStuffTalentDto] as IStuffTalentLikeUserDto[]
      ).filter((likeUsers) => likeUsers.isLike).length,
      imageUrls: payload.atchFiles.map((v) => v.url),
      chatroomId: (
        payload[predefined.stuffTalentUsersProperty as keyof IStuffTalentDto] as IStuffTalentLikeUserDto[]
      ).find((likeUsers) => likeUsers.isUse && likeUsers.user?.id === loginUserId)?.chatroom?.id,
    })
  }
}

// TODO 나중에 resource? code? 와 연결하고, 별도 모듈로 분리하자.
interface ILabel {
  value: string
  label: string
}

export const getLabel = (labels: ILabel[], value: string) => labels.find((l) => l.value === value)?.label

export const typeLabels: ILabel[] = [
  { value: StuffTalentType.SELL, label: '팔아요' },
  { value: StuffTalentType.SHARE, label: '나눠요' },
  { value: StuffTalentType.EXCHANGE, label: '교환해요' },
  { value: StuffTalentType.WANT, label: '구해요' },
]

export const statusLabels: ILabel[] = [
  { value: StuffTalentStatus.AVAILABLE, label: '판매중' },
  { value: StuffTalentStatus.RESERVED, label: '예약중' },
  { value: StuffTalentStatus.FINISH, label: '거래완료' },
]

export const getPageKey = (path: string) => {
  const upperPath = path.toUpperCase()
  return _.find(StuffTalentPageKey, (pageKey) => upperPath.includes(pageKey))!
}

interface IRouteFunc {
  [index: string]: {
    routeList: () => void
    routeForm: (param?: IGoDetailRouteParam) => void
    routeDetail: (id: number, isReplace?: boolean) => void
  }
}

export const routeFunc: IRouteFunc = {
  [StuffTalentPageKey.STUFF]: {
    routeList: () => route.stuff(),
    routeForm: (param?) => route.stuffForm(param),
    routeDetail: (id, isReplace?) => route.stuffDetail(id, isReplace),
  },
  [StuffTalentPageKey.TALENT]: {
    routeList: () => route.talent(),
    routeForm: (param?) => route.talentForm(param),
    routeDetail: (id, isReplace?) => route.talentDetail(id, isReplace),
  },
}
