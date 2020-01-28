import { cleanDir } from './utils/file-system'

const clean = () =>
  Promise.all([
    cleanDir('?(build|coverage|storybook-static)', { dot: true, nosort: true }),
    cleanDir('.?(eslint|stylelint)cache', { nosort: true }),
    cleanDir('*.log*', { dot: true, nosort: true }),
  ])

export default clean
