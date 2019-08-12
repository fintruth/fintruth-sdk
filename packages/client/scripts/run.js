export const format = time =>
  time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')

const run = (fn, options) => {
  const start = new Date()
  const task = typeof fn.default === 'undefined' ? fn : fn.default

  console.info(
    `[${format(start)}] Starting '${task.name}${
      options ? ` (${options})` : ''
    }'`
  )

  return task(options).then(resolution => {
    const end = new Date()
    const time = end.getTime() - start.getTime()

    console.info(
      `[${format(end)}] Finished '${task.name}${
        options ? ` (${options})` : ''
      }' after ${time} ms`
    )

    return resolution
  })
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]

  const module = require(`./${process.argv[2]}`).default

  run(module).catch(error => {
    console.error(error.stack)

    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  })
}

export default run
