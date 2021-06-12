import { action, observable } from 'mobx'
import { SEGMENT_KEYS } from './../models/segment.d'

const initialSegment = {
  myList: SEGMENT_KEYS.stuff,
}

export class SegmentStore {
  @observable mylistSegment = initialSegment.myList

  @action
  setMyListSegment = (segment: SEGMENT_KEYS) => {
    this.mylistSegment = segment
  }

  @action
  resetMyListSegment = () => this.setMyListSegment(initialSegment.myList)
}
