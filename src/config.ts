import { Capacitor } from '@capacitor/core'
import { Style } from '@capacitor/status-bar'

type ENV = 'development' | 'production' | 'test'
const NODE_ENV: ENV = process.env.NODE_ENV

interface Config {
  API_URL: string
  SOCKET_URL: string
  KEY: {
    ENCRYPT_SECRET: string
  }
  IS_PROD: boolean /** 프로덕션 빌드 여부 */
}

interface ConfigByEnv {
  development: Config
  production: Config
  test: Config
}

const serverUrl = 'https://hama.network'
// const serverUrl = 'http://localhost:8080'

// TODO: 실서버 배포시, key변경해야함
const configEnv: ConfigByEnv = {
  development: {
    API_URL: serverUrl + '/api',
    SOCKET_URL: serverUrl + '/ws-chat',
    KEY: {
      ENCRYPT_SECRET: '8DA03642F53C0D631F1E6884F8C9BA60',
    },
    IS_PROD: false,
  },
  production: {
    API_URL: serverUrl + '/api',
    SOCKET_URL: serverUrl + '/ws-chat',
    KEY: {
      ENCRYPT_SECRET: '8DA03642F53C0D631F1E6884F8C9BA60',
    },
    IS_PROD: true,
  },
  /* eslint-disable */
  test: {} as any,
}

interface StatusBarStyle {
  STATUSBAR_STYLE?: Style
  STATUSBAR_BG_COLOR?: string // StatusBar.setBackgroundColor() => android에만 적용가능
}
interface ConfigByPlatform {
  android: StatusBarStyle
  ios: StatusBarStyle
  web: StatusBarStyle
}

const configPlatform: ConfigByPlatform = {
  android: {
    STATUSBAR_STYLE: Style.Light,
    // android에서는 StatusBarStyle.Light 설정 시, 글자색(검정)만 적용되고 배경색(흰색)은 적용이 안됨.
    // 그래서 bgcolor를 별도로 설정해야 함.
    STATUSBAR_BG_COLOR: 'ffffff',
  },
  ios: {
    STATUSBAR_STYLE: Style.Light,
  },
  web: {},
}

const field = Capacitor.getPlatform()

export const config = {
  ...configEnv[NODE_ENV],
  ...configPlatform[field as keyof ConfigByPlatform],
}
