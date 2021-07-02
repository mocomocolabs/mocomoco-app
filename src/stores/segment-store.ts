import { action, observable } from 'mobx'
import { SEGMENT_KEYS } from './../models/segment.d'

const initialSegment = {
  myList: SEGMENT_KEYS.stuff,
  likeList: SEGMENT_KEYS.stuff,
}

export class SegmentStore {
  @observable myListSegment = initialSegment.myList
  @observable likeListSegment = initialSegment.likeList

  @action
  setMyListSegment = (segment: SEGMENT_KEYS) => {
    this.myListSegment = segment
  }

  @action
  resetMyListSegment = () => this.setMyListSegment(initialSegment.myList)

  @action
  setLikeListSegment = (segment: SEGMENT_KEYS) => {
    this.likeListSegment = segment
  }

  @action
  resetLikeListSegment = () => this.setLikeListSegment(initialSegment.likeList)
}
