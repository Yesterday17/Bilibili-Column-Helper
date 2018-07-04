import * as https from 'https'

export function gets (addr) {
  return new Promise((resolve, reject) => {
    https.get(addr, res => {
      let body = ''

      res.on('data', chunk => {
        body += chunk
      })

      res.on('end', () => {
        resolve(body)
      })

      res.on('error', err => {
        reject(err)
      })
    })
  })
}
