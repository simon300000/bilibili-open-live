import { e } from './globals.js'

export const auth = async ({ accessKeyId, accessKeySecret, url, data }: { accessKeyId: string, accessKeySecret: string, url: string, data: any }) => {
  const { md5, hmac, post } = e()

  const body = JSON.stringify(data)
  const random = String(Math.random())
  const timestamp = String(Math.floor(Date.now() / 1000))

  const hashHeaders = {
    'x-bili-accesskeyid': accessKeyId,
    'x-bili-content-md5': md5(body),
    'x-bili-signature-method': 'HMAC-SHA256',
    'x-bili-signature-nonce': random,
    'x-bili-signature-version': '1.0',
    'x-bili-timestamp': timestamp
  }

  const toHash = Object.entries(hashHeaders).map(kv => kv.join(':')).sort().join('\n')

  const hash = await hmac({ key: accessKeySecret, body: toHash })
  return post({
    url,
    body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...hashHeaders,
      'Authorization': hash
    }
  })
}
