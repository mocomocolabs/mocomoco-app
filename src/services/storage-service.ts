import { Plugins } from '@capacitor/core'
import { config } from '../config'
import { decrypt, encrypt } from '../utils/encrypt-util'
const { Storage } = Plugins

class StorageService {
  private _communityId = 0
  accessTokenForSync = ''

  private readonly COMMUNITY_ID = 'COMMUNITY_ID'
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  private readonly STORE_CHAT_ROOM = 'STORE_CHAT_ROOM'

  setCommunityId(id: number): Promise<void> {
    // ** 주의
    // community-store.ts의 selectedId도 함께 셋팅해줄것
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

  async setAccessTokenForSync() {
    this.accessTokenForSync = await this.getAccessToken()
  }

  setStoreChatRoom(storeChatRoom: string) {
    return this.setObject(this.STORE_CHAT_ROOM, storeChatRoom)
  }

  getStoreChatRoom() {
    return this.getObject(this.STORE_CHAT_ROOM)
  }
}

export const storage = new StorageService()
