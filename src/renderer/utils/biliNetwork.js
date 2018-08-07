import * as fs from 'fs'
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

export async function upcoverLocal (imagePath, cookies) {
  return await upcover('data:image/png;base64,' + fs.readFileSync(imagePath).toString('base64'), cookies)
}

export async function addUpdate (passage, cookies, renderer) {
  if (typeof cookies !== 'string') return

  const cover = await upcoverLocal(passage.data.image, cookies)
  console.log(cover)

  const result = await network.postBilibili('http://api.bilibili.com/x/article/creative/draft/addupdate', cookies, {
    title: passage.data.name,
    banner_url: cover['data']['url'],
    content: renderer(passage.content.local), // TODO: Use Remote instead.
    summary: '',
    words: passage.content.local.length, // TODO: Use Remote instead.
    category: passage.data.subtype,
    list_id: 0,
    tid: 4,
    reprint: 0,
    tags: passage.data.tags,
    image_urls: '',
    origin_image_urls: '',
    dynamic_intro: '',
    csrf: cookies.match(/bili_jct=([^;]+)/)[1]
  })
  console.log(result)
  return result
}
