import { IonSearchbar } from '@ionic/react'
import { forwardRef } from 'react'
import './SearchbarComponent.scss'

export interface SearchbarChangeEventDetail {
  value: string | undefined
}

interface ISearchbar {
  value: string
  onSearchSubmit: (event: CustomEvent<SearchbarChangeEventDetail>) => void
}

export const Searchbar = forwardRef<HTMLIonSearchbarElement, ISearchbar>(({ value, onSearchSubmit }, ref) => {
  return (
    <IonSearchbar
      className='searchbar'
      ref={ref}
      value={value}
      onIonChange={onSearchSubmit}
      type='search'
      inputmode='search'
      enterkeyhint='search'
      placeholder='검색'
      searchIcon='assets/icon/search.svg'
      clearIcon='assets/icon/delete.svg'
      showClearButton='always'
      debounce={500}
      animated={true}
    />
  )
})
