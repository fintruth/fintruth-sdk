import split from 'split'
import winston from 'winston'

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

logger.stream = split().on('data', logger.info) as any
