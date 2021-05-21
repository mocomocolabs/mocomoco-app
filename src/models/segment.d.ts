import { StuffTalentStore } from '../stores/stufftalent-store'
import { ClubStore } from './../stores/club-store'
import { FeedStore } from './../stores/feed-store'

export enum SEGMENT_KEYS {
  stuff = 'stuff',
  talent = 'talent',
  feed = 'feed',
  club = 'club',
}

export type SegmentStoreType = StuffTalentStore | FeedStore | ClubStore

export interface ISegments {
  [key: string]: { label: string; store: SegmentStoreType }
}
