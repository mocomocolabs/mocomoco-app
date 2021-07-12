import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../hooks/use-store'
import { MyPageMyListBase } from './MyPageMyListBase'

export const MyPageLikeList: React.FC = () => {
  const { $segment, $feed, $club } = useStore()

  return useObserver(() => (
    // TODO 개별 observable값이 변경될 때마다 페이지 전체가 리렌더되는 게 좀 별로다.
    // 관련된 컴포넌트부분만 리렌더되도록 수정할 수 있을지 연구해보자.
    <MyPageMyListBase
      {...{
        title: '관심 목록',
        initialFilter: {
          communityId: null,
          userId: undefined,
          isPublic: false,
          categories: [],
          notStatuses: [],
          types: [],
          isLike: true,
          // TODO: 추후 페이징 처리
          limit: 999,
        },
        selectedSegment: $segment.likeListSegment,
        setSelectedSegment: $segment.setLikeListSegment,
        fetchFeeds: $feed.getLikeFeeds,
        fetchClubs: $club.getLikeClubs,
        clubs: $club.likeClubs,
      }}
    />
  ))
}
