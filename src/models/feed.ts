import _ from 'lodash'
import { IFeedDto, IFeedScheduleDto } from '../stores/feed-store.d'
import { datetimeRange } from '../utils/datetime-util'
import { Comment } from './comment'
import { IFeed, IFeedSchedule } from './feed.d'
import { User } from './user'

export interface Feed extends IFeed {}

export class Feed {
  static of(dto: IFeedDto, userId: number): IFeed {
    if (!!!dto || _.isEmpty(dto)) {
      return {} as IFeed
    }

    const comments = dto.feedComments
      .filter((v) => v.isUse)
      .sort((a, b) => Number.parseInt(a.createdAt) - Number.parseInt(b.createdAt))
      .map((c) => Comment.of(c))

    return {
      ...dto,
      user: User.of(dto.user),
      schedule: dto.schedule?.isUse ? this.scheduleOf(dto.schedule) : undefined,
      imageUrls: dto.atchFiles.map((v) => v.url),
      comments,
      likeCount: dto.feedUsers.filter((v) => v.isLike).length,
      writtenComment: comments.some((v) => v.user.id === userId),
    }
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
