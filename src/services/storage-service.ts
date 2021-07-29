import { Storage } from '@capacitor/storage'
import { config } from '../config'
import { IStoreChatRoom } from '../models/chat'
import { decrypt, encrypt } from '../utils/encrypt-util'

class StorageService {
  private _communityId: number | null = 0
  accessTokenForSync = ''

  private readonly HAVE_SEEN_INTRO = 'HAVE_SEEN_INTRO'
  private readonly COMMUNITY_ID = 'COMMUNITY_ID'
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  private readonly STORE_CHAT_ROOM = 'STORE_CHAT_ROOM'

  setHaveSeenIntro() {
    return this.setObject(this.HAVE_SEEN_INTRO, true)
  }

  getHaveSeenIntro(): Promise<boolean> {
    return this.getObject(this.HAVE_SEEN_INTRO)
  }

  setCommunityId(id: number | null): Promise<void> {
    this._communityId = id
    return this.setObject(this.COMMUNITY_ID, id)
  }

  async getAccessToken(): Promise<string> {
    const token = await this.getObject(this.ACCESS_TOKEN)
    if (!token) {
      return ''
    }
    return decrypt(token, config.KEY.ENCRYPT_SECRET)
  }

  setAccessToken(accessToken: string): Promise<void> {
    return this.setObject(this.ACCESS_TOKEN, encrypt(accessToken, config.KEY.ENCRYPT_SECRET))
  }

  async getRefreshToken(): Promise<string> {
    const token = await this.getObject(this.REFRESH_TOKEN)
    if (!token) {
      return ''
    }
    return decrypt(token, config.KEY.ENCRYPT_SECRET)
  }

  setRefreshToken(refreshToken: string): Promise<void> {
    return this.setObject(this.REFRESH_TOKEN, encrypt(refreshToken, config.KEY.ENCRYPT_SECRET))
  }

  async setAccessTokenForSync() {
    this.accessTokenForSync = await this.getAccessToken()
  }

  setStoreChatRoom(storeChatRoom: IStoreChatRoom[]) {
    return this.setObject(this.STORE_CHAT_ROOM, storeChatRoom)
  }

  getStoreChatRoom(): Promise<IStoreChatRoom[]> {
    return this.getObject(this.STORE_CHAT_ROOM)
  }

  // eslint-disable-next-line
  private async setObject(key: string, value: any) {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    })
  }

  private async getObject(key: string) {
    const ret = await Storage.get({ key })
    if (!ret.value) {
      return null
    }
    return JSON.parse(ret.value)
  }

  get communityId() {
    return this._communityId
  }

  async clear() {
    await Storage.clear()
  }
}

export const storage = new StorageService()
