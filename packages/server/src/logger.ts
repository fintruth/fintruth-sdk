import { is } from 'ramda'
import split from 'split'
import winston from 'winston'

export type LogFn = (message: Loggable, level?: string) => void
export type Loggable = string | number | object

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(({ timestamp, level, message, ...args }) => {
    const ts = timestamp.slice(0, 19).replace('T', ' ')

    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length > 0 ? JSON.stringify(args, null, 2) : ''
    }`
  })
)

const transports = [
  new winston.transports.Console({
    level: 'debug',
    format: alignedWithColorsAndTime,
    handleExceptions: true,
  }),
]

export const logger = winston.createLogger({
  exitOnError: false,
  level: 'debug',
  transports,
})

export const logAs = (name: string) => (
  message: Loggable,
  level: string = 'info'
) => {
  if (is(Object, message)) {
    logger.log(level, `[${name}]`, message)
  } else {
    logger.log(level, `[${name}] ${message}`)
  }
}

logger.stream = split().on('data', logger.info) as any
