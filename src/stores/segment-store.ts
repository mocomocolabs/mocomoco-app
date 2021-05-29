import { action, observable } from 'mobx'
import { SEGMENT_KEYS } from './../models/segment.d'

export class SegmentStore {
  @observable mylistSegment = SEGMENT_KEYS.stuff

  @action
  setMyListSegment = (segment: SEGMENT_KEYS) => {
    this.mylistSegment = segment
  }
}
