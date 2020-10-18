const IS_DEV = process.env.NODE_ENV === 'development'

const APP_ENV = IS_DEV ? 'dev' : process.env.APP_ENV

const ENV_CONFIG = {
  dev: {
    domain: 'http://localhost:7777',
    other: 'http://www.baidu.com'
  },
  sit: {
    domain: 'http://localhost:7777',
    other: 'http://www.baidu.com'
  },
  uat: {
    domain: 'http://localhost:7777',
    other: 'http://www.baidu.com'
  },
  pro: {
    domain: 'http://localhost:7777',
    other: 'http://www.baidu.com'
  }
}

const CURRENT_CONFIG = ENV_CONFIG[APP_ENV]

export { APP_ENV, CURRENT_CONFIG }
