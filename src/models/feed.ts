import { IFeedDto } from '../stores/feed-store.d'
import { IFeed } from './feed.d'

export interface Feed extends IFeed {}

// id: number
// type: FeedType
// scheduleDate: string // TODO: 임시
// scheduleTitle: string
// user: IUser
// title: string
// content: string
// imageUrls: string[]
// commentCount: number
// likeCount: number
// likeProflieUrls: string[]
// comments: IComment[]
// createdAt: string // TODO: 임시
// isPublic: boolean

export class Feed {
  static of(dto: IFeedDto, userId: number) {
    return Object.assign(new Feed(), {
      ...dto,
      scheduleDate: dto.scheduleDate.substr(0, 8),
      scheduleTime: dto.scheduleDate.substr(8),
      community: {
        ...dto.community,
        bannerUrl: dto.community.atchFiles[0]?.url,
      },
      imageUrls: dto.atchFiles.map((v) => v.url),
      comments: dto.feedComments.filter((v) => v.isUse),
      likeCount: dto.feedUsers.filter((v) => v.isLike).length,
      writtenComment: dto.feedComments.some((v) => v.id === userId),
    })
  }
}
