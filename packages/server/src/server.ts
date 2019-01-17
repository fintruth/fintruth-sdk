import Cookies from 'cookies'
import express, { Request, Response, NextFunction } from 'express'
import expressJwt, { UnauthorizedError } from 'express-jwt'
import morgan from 'morgan'

import { secret, trustProxy } from 'config'
import { User } from 'entities/user'
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

export const createExpressServer = () =>
  express()
    .set('trust proxy', trustProxy)
    .use(Cookies.express(['token-id']))
    .use(morgan('common', { stream: logger.stream } as any))
    .use(
      expressJwt({
        credentialsRequired: false,
        getToken: (req: Request) => req.cookies.get('token-id'),
        secret,
      })
    )
    .use(logUnauthorizedError)
