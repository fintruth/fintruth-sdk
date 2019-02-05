import Cookies from 'cookies'
import cors from 'cors'
import compression from 'compression'
import express, { Application, NextFunction, Request, Response } from 'express'
import expressJwt, { UnauthorizedError } from 'express-jwt'
import morgan from 'morgan'
import { User } from './entities'
import { secret, trustProxy } from 'config'
import { logger } from 'logger'

export interface ServerRequest extends Request {
  user?: User
}

export interface ServerResponse extends Response {
  cookies: Cookies
}

const logUnauthorizedError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnauthorizedError) {
    logger.error('[express-jwt-error]', req.cookies.get('token-id'))
    res.clearCookie('token-id')
  }

  return next(err)
}

export const createServer = (): Application =>
  express()
    .set('trust proxy', trustProxy)
    .use(Cookies.express(['token-id']))
    .use(compression())
    .use(cors({ credentials: true, origin: true }))
    .use(morgan('common', { stream: logger.stream } as any))
    .use(
      expressJwt({
        credentialsRequired: false,
        getToken: (req: Request) => req.cookies.get('token-id'),
        secret,
      })
    )
    .use(logUnauthorizedError)
