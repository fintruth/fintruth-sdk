import { URL } from 'url'

const getUrl = (token: string, baseUrl: string) => {
  const url = new URL('/sign-up/confirm', baseUrl)
  url.searchParams.set('token', token)

  return url
}

const registration = (name: string, token: string, baseUrl: string) => {
  const subject = 'Complete Sign Up'
  const url = getUrl(token, baseUrl)

  return {
    body: `
      <p>Hi ${name},</p>
      <p>Click <a href="${url}">here</a> to complete the sign-up process or paste the following link in your browser:</p>
      <p><a href="${url}">${url}</a></p>
    `,
    subject,
  }
}

export default registration
