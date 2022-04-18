import { createHash, createHmac } from 'crypto'

import fetch from 'node-fetch'

import { inject } from "./globals.js"

const md5F = (body: string) => createHash('md5').update(body).digest('hex')
const hmacF = async ({ key, body }: { key: string, body: string }) => createHmac('sha256', key).update(body).digest('hex')

const postF = ({ url, body, headers }: { url: string, body: string, headers: Record<string, string> }) =>
  fetch(url, { method: 'post', body, headers })
    .then(w => w.json())

inject({ md5F, hmacF, postF })

export * from "./common.js"
