type ENV = 'development' | 'production' | 'test'
const NODE_ENV: ENV = process.env.NODE_ENV

interface Config {
  API_URL: string
}

interface ConfigByEnv {
  development: Config
  production: Config
  test: Config
}

const configEnv: ConfigByEnv = {
  development: {
    API_URL: 'http://localhost:5050/api',
  },
  production: {
    API_URL: 'http://localhost:5050/api',
  },
  /* eslint-disable */
  test: {} as any,
}

export const config = configEnv[NODE_ENV]
