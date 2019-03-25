import childProcess from 'child_process'

export const exec = (command, options) =>
  new Promise((resolve, reject) =>
    childProcess.exec(command, options, (error, stdout, stderr) =>
      error ? reject(error) : resolve({ stdout, stderr })
    )
  )

export const spawn = (command, args, options) =>
  new Promise((resolve, reject) =>
    childProcess
      .spawn(command, args, options)
      .on('close', code =>
        code === 0
          ? resolve()
          : reject(new Error(`${command} ${args.join(' ')} => ${code} (error)`))
      )
  )

export default { exec, spawn }
