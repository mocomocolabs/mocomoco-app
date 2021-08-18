import { IonHeader, IonToolbar } from '@ionic/react'
import React, { FC, useEffect, useRef } from 'react'
import { Searchbar, SearchbarChangeEventDetail } from '../atoms/SearchbarComponent'
import { TextHeader } from '../atoms/TextHeaderComponent'
import { BackButton } from '../molecules/BackButtonComponent'
import './HeaderComponent.scss'

export interface IHeaderSearchbar {
  show: boolean
  setShow: (show: boolean) => void
  value: string
  setValue: (search: string) => void
}
export interface IHeader {
  start?: React.ReactNode
  center?: React.ReactNode
  end?: React.ReactNode
  bottom?: React.ReactNode
  searchbar?: IHeaderSearchbar
}

export const Header: FC<IHeader> = ({ start, center, end, bottom, searchbar }) => {
  const searchbarRef = useRef<HTMLIonSearchbarElement>(null)

  useEffect(() => {
    searchbar?.show && setTimeout(async () => searchbarRef.current?.setFocus(), 100)
  }, [searchbar?.show])

  return (
    <IonHeader>
      <IonToolbar>
        <div className='header-container' hidden={searchbar?.show}>
          <div className='header-item-start'>
            <TextHeader className='ellipsis'>{start}</TextHeader>
          </div>
          <div className='header-item-center'>
            <TextHeader className='ellipsis'>{center}</TextHeader>
          </div>
          <div className='header-item-end'>
            <TextHeader className='ellipsis'>{end}</TextHeader>
          </div>
        </div>

        <div className='header-container' hidden={!searchbar?.show}>
          <BackButton
            type='arrow'
            action={() => {
              searchbar?.setShow(false)
            }}
          />
          <Searchbar
            ref={searchbarRef}
            value={searchbar?.value || ''}
            onSearchSubmit={(e: CustomEvent<SearchbarChangeEventDetail>) =>
              searchbar?.setValue(e.detail.value!)
            }
          />
        </div>
      </IonToolbar>

      {bottom}
    </IonHeader>
  )
}
