import { IFeedDto, IFeedScheduleDto } from '../stores/feed-store.d'
import { IFeed, IFeedSchedule } from './feed.d'

export interface Feed extends IFeed {}

export class Feed {
  static of(dto: IFeedDto, userId: number) {
    return Object.assign(new Feed(), {
      ...dto,
      schedule: this.scheduleOf(dto.schedule),
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

  static scheduleOf(dto: IFeedScheduleDto): IFeedSchedule | undefined {
    return (
      dto && {
        id: dto.id,
        title: dto.title,
        place: dto.place,
        startDate: dto.startDateTime?.substr(0, 8),
        startTime: dto.startDateTime?.substr(0, 8),
        endDate: dto.endDateTime?.substr(0, 8),
        endTime: dto.endDateTime?.substr(0, 8),
      }
    )
  }
}
