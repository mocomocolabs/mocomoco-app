export enum SEGMENT_KEYS {
  stuff = 'stuff',
  talent = 'talent',
  feed = 'feed',
  club = 'club',
  schedule = 'schedule',
}

export interface ISegments {
  [key: string]: { label: string }
}
