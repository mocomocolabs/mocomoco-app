export enum SEGMENT_KEYS {
  stuff = 'stuff',
  talent = 'talent',
  feed = 'feed',
  club = 'club',
}

export interface ISegments {
  [key: string]: { label: string }
}
