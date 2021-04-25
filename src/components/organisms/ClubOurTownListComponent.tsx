import { FC } from 'react'
import { Club } from '../../models/club'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextXs } from '../atoms/TextXsComponent'
import { ImageWithCorner } from '../molecules/ImageWithCorner'

export interface IClubOurTownList {
  clubs: Club[]
}

export const ClubOurTownList: FC<IClubOurTownList> = ({ clubs }) => {
  return (
    <>
      {clubs.length ? (
        clubs.map((v) => (
          <div
            className='flex-col br-xxlg shadow pb-2 relative mb-5'
            key={v.id}
            onClick={() => route.clubDetail(v.id)}
          >
            <ImageWithCorner height={160} url={v.imageUrls[0]}></ImageWithCorner>
            <div className='flex-col px-3 ml-0 br-b-xxlg text-left'>
              <TextBase className='text-bold'>{v.name}</TextBase>
              <div className='flex'>
                <div className='flex items-center'>
                  <Icon name='time' className=''></Icon>
                  <TextXs className='ml-1'>{v.meetingPlace}</TextXs>
                </div>
                <div className='ml-4 flex items-center'>
                  <Icon name='time' className=''></Icon>
                  <TextXs className='ml-1'>{v.meetingTime}</TextXs>
                </div>
              </div>
              {v.hashtagNames.length && <TextXs className='green mt-2'>#{v.hashtagNames.join(' #')}</TextXs>}
            </div>
          </div>
        ))
      ) : (
        <Spinner></Spinner>
      )}
    </>
  )
}