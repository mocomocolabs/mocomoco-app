type ENV = 'development' | 'production' | 'test'
const NODE_ENV: ENV = process.env.NODE_ENV

interface Config {
  API_URL: string
}

interface ConfigAll {
  development: Config
  production: Config
  test: Config
}

const config: ConfigAll = {
  development: {
    API_URL: 'http://localhost:5050/api',
  },
  production: {
    API_URL: 'http://localhost:5050/api',
  },
  test: {} as any,
}

export default config[NODE_ENV]
