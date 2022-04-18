let md5: (body: string) => string
let hmac: ({ key, body }: { key: string, body: string }) => Promise<string>
let post: ({ url, body, headers }: { url: string, body: string, headers: Record<string, string> }) => Promise<any>

export const inject = ({ md5F, hmacF, postF }: { md5F: typeof md5, hmacF: typeof hmac, postF: typeof post }) => {
  md5 = md5F
  hmac = hmacF
  post = postF
}

export const e = () => ({ md5, hmac, post })
