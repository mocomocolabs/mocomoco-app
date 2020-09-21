import { useContext } from 'react'
import { RootStore } from '../stores'
import { StoreContext } from './store-provider'

export const useStore = (): RootStore => useContext(StoreContext)
