import * as network from './network'

export async function getUserInfo (cookies) {
  const result = await network.getBilibili(
    'https://member.bilibili.com/x/web/data/article',
    cookies
  )
  if (result['code'] === 0) {
    return result['data']
  } else {
    return undefined
  }
}

export async function upcover (image, cookies) {
  if (typeof cookies !== 'string') return

  const result = await network.postBilibili('https://member.bilibili.com/x/web/article/upcover', cookies, {
    cover: image,
    csrf: cookies.match(/bili_jct=([^;]+)/)[1]
  })
  return result
}
