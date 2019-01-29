import path from 'path'
import fetch from 'node-fetch'
import run from './run'
import { makeDir } from './lib/fs'
import { spawn } from './lib/cp'

const remote = {
  name: 'github',
  url: 'https://github.com/<user>/<repo>.git',
  branch: 'gh-pages',
  website: 'https://<user>.github.io/<repo>/',
  static: true,
}

const options = {
  cwd: path.resolve(__dirname, '../build'),
  stdio: ['ignore', 'inherit', 'inherit'],
}

const deploy = async () => {
  // Initialize a new repository
  await makeDir('build')
  await spawn('git', ['init', '--quiet'], options)

  // Changing a remote's URL
  let isRemoteExists = false
  try {
    await spawn(
      'git',
      ['config', '--get', `remote.${remote.name}.url`],
      options
    )
    isRemoteExists = true
  } catch (error) {
    /* skip */
  }
  await spawn(
    'git',
    ['remote', isRemoteExists ? 'set-url' : 'add', remote.name, remote.url],
    options
  )

  // Fetch the remote repository if it exists
  let isRefExists = false
  try {
    await spawn(
      'git',
      ['ls-remote', '--quiet', '--exit-code', remote.url, remote.branch],
      options
    )
    isRefExists = true
  } catch (error) {
    await spawn('git', ['update-ref', '-d', 'HEAD'], options)
  }
  if (isRefExists) {
    await spawn('git', ['fetch', remote.name], options)
    await spawn(
      'git',
      ['reset', `${remote.name}/${remote.branch}`, '--hard'],
      options
    )
    await spawn('git', ['clean', '--force'], options)
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push('--release')
  await run(require('./build').default)

  // Push the contents of the build folder to the remote server via Git
  await spawn('git', ['add', '.', '--all'], options)
  try {
    await spawn('git', ['diff', '--cached', '--exit-code', '--quiet'], options)
  } catch (error) {
    await spawn(
      'git',
      ['commit', '--message', `Update ${new Date().toISOString()}`],
      options
    )
  }
  await spawn(
    'git',
    ['push', remote.name, `master:${remote.branch}`, '--set-upstream'],
    options
  )

  // Check if the site was successfully deployed
  const response = await fetch(remote.website)

  console.info(`${remote.website} => ${response.status} ${response.statusText}`)
}

export default deploy
