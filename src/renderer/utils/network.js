const request = require('request-promise').defaults({
  jar: true
})

export async function gets (options) {
  return await request(options)
}
