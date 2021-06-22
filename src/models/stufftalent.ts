import { IStuffTalentDto } from '../stores/stufftalent-store.d'
import { IStuffTalent, StuffTalentPathName, StuffTalentStatus, StuffTalentType } from './stufftalent.d'

export interface StuffTalent extends IStuffTalent {}

export class StuffTalent {
  static of(payload: IStuffTalentDto, pathname: StuffTalentPathName) {
    return Object.assign(new StuffTalent(), {
      ...payload,
      likeCount: (pathname === StuffTalentPathName.STUFF ? payload.stuffUsers : payload.talentUsers).filter(
        (s) => s.isLike && s.isUse
      ).length,
      imageUrls: payload.atchFiles.map((v) => v.url),
      // chatroomId: payload.chatroom.id, // TODO
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
