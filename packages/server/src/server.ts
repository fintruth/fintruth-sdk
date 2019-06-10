import Cookies from 'cookies'
import cors from 'cors'
import compression from 'compression'
import express, { Application, NextFunction, Request, Response } from 'express'
import expressJwt, { UnauthorizedError } from 'express-jwt'
import morgan from 'morgan'
import { Container } from 'typedi'

import { User } from './entities'
import { logAs, logger } from './logger'
import { ConfigService } from './services'

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
    logAs('express-jwt')(req.cookies.get('token-id'), 'debug')
    res.clearCookie('token-id')
  }

  return next(err)
}

const { secret, trustProxy } = Container.get(ConfigService).app

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
