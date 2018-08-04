import * as network from './network'

export async function getUserInfo (cookies) {
  const result = await network.getBilibili('https://member.bilibili.com/x/web/data/article', cookies)
  if (result['code'] === 0) {
    return result['data']
  } else {
    return undefined
  }
}
