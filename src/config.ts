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

// TODO: 실서버 배포시, key변경해야함
const configEnv: ConfigByEnv = {
  development: {
    API_URL: '/api',
    SOCKET_URL: '/ws-chat',
    KEY: {
      ENCRYPT_SECRET: '8DA03642F53C0D631F1E6884F8C9BA60',
    },
    IS_PROD: false,
  },
  production: {
    API_URL: 'http://13.209.84.58/api',
    SOCKET_URL: 'http://13.209.84.58/ws-chat',
    KEY: {
      ENCRYPT_SECRET: '8DA03642F53C0D631F1E6884F8C9BA60',
    },
    IS_PROD: true,
  },
  /* eslint-disable */
  test: {} as any,
}

export const config = configEnv[NODE_ENV]
