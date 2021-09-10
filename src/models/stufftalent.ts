import _ from 'lodash'
import { IRouteParam, route } from '../services/route-service'
import { IStuffTalentDto, IStuffTalentLikeUserDto } from '../stores/stufftalent-store.d'
import { ChatRoom } from './chat-room'
import { Community } from './community'
import {
  IStuffTalent,
  IStuffTalentLikeUser,
  StuffTalentPageKey,
  StuffTalentStatus,
  StuffTalentType,
} from './stufftalent.d'
import { User } from './user'

export interface StuffTalent extends IStuffTalent {}

export class StuffTalent {
  static of(dto: IStuffTalentDto, key: StuffTalentPageKey, loginUserId: number): IStuffTalent {
    if (!!!dto || _.isEmpty(dto)) {
      return {} as IStuffTalent
    }

    const stufftalentUsers = (key === StuffTalentPageKey.STUFF ? dto.stuffUsers : dto.talentUsers) ?? []

    return {
      ...dto,
      user: User.of(dto.user),
      community: Community.of(dto.community),
      stuffUsers: !!dto.stuffUsers
        ? dto.stuffUsers.map((u) => this.stufftalentUserOf(u, loginUserId))
        : ({} as IStuffTalentLikeUser[]),
      talentUsers: !!dto.talentUsers
        ? dto.talentUsers.map((u) => this.stufftalentUserOf(u, loginUserId))
        : ({} as IStuffTalentLikeUser[]),
      likeCount: stufftalentUsers.filter((u) => u.isLike)?.length ?? 0,
      chatroomId: stufftalentUsers.find((u) => u.isUse && u.user?.id === loginUserId)?.chatroom?.id ?? 0,
      imageUrls: dto.atchFiles.map((v) => v.url),
    }
  }

  static stufftalentUserOf(dto: IStuffTalentLikeUserDto, loginUserId: number): IStuffTalentLikeUser {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          user: User.of(dto.user),
          chatroom: ChatRoom.of(dto.chatroom, loginUserId),
        }
      : ({} as IStuffTalentLikeUser)
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
    routeForm: (param?: IRouteParam) => void
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
