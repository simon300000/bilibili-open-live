import { inject } from './globals.js'

import CryptoJS from 'crypto-js'

const md5F = (body: string) => CryptoJS.MD5(body).toString()

const hmacF = async ({ key: keyString, body }: { key: string, body: string }) => {
  const alg = { name: 'HMAC', hash: 'SHA-256' }
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(keyString), alg, false, ['sign', 'verify'])
  const result = await crypto.subtle.sign(alg, key, new TextEncoder().encode(body))
  return [...new Uint8Array(result)].map(x => x.toString(16).padStart(2, '0'))
    .join('')
}

const postF = async ({ url, body, headers }: { url: string, body: string, headers: Record<string, string> }) =>
  fetch(url, { method: 'post', body, headers })
    .then(w => w.json())

inject({ md5F, hmacF, postF })

export * from "./common.js"
