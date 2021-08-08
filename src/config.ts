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

const serverUrl = 'http://3.35.164.207'
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

export const config = configEnv[NODE_ENV]
