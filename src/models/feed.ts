import _ from 'lodash'
import { IFeedDto, IFeedScheduleDto } from '../stores/feed-store.d'
import { datetimeRange } from '../utils/datetime-util'
import { Comment } from './comment'
import { IFeed, IFeedSchedule } from './feed.d'
import { User } from './user'

export interface Feed extends IFeed {}

export class Feed {
  static of(dto: IFeedDto, userId: number): IFeed {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          user: User.of(dto.user),
          schedule: dto.schedule?.isUse ? this.scheduleOf(dto.schedule) : undefined,
          imageUrls: dto.atchFiles.map((v) => v.url),
          comments: dto.feedComments.filter((v) => v.isUse).map((c) => Comment.of(c)),
          likeCount: dto.feedUsers.filter((v) => v.isLike).length,
          writtenComment: dto.feedComments.some((v) => v.id === userId),
        }
      : ({} as IFeed)
  }

  static scheduleOf(dto: IFeedScheduleDto): IFeedSchedule {
    return !!dto && !_.isEmpty(dto)
      ? {
          ...dto,
          startDate: dto.startDateTime.substr(0, 8),
          startTime: dto.startDateTime.substr(8),
          endDate: dto.endDateTime.substr(0, 8),
          endTime: dto.endDateTime.substr(8),
          formatScheduleTime: datetimeRange(dto.startDateTime, dto.endDateTime),
          feedId: dto.feed.id,
        }
      : ({} as IFeedSchedule)
  }
}
