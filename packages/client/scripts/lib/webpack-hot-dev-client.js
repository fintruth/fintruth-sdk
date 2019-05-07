import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import hotClient from 'webpack-hot-middleware/client'
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint'
import {
  dismissBuildError,
  reportBuildError,
  setEditorHandler,
  startReportingRuntimeErrors,
  stopReportingRuntimeErrors,
} from 'react-error-overlay'

setEditorHandler(errorLocation =>
  fetch(
    `${launchEditorEndpoint}?fileName=${encodeURIComponent(
      errorLocation.fileName
    )}&lineNumber=${encodeURIComponent(errorLocation.lineNumber || 1)}`
  )
)

hotClient.setOptionsAndConnect({ name: 'client', reload: true })
hotClient.useCustomOverlay({
  clear: () => dismissBuildError(),
  showProblems: (type, errors) =>
    reportBuildError(formatWebpackMessages({ errors, warnings: [] }).errors[0]),
})

startReportingRuntimeErrors({ filename: '/assets/client.js' })

if (module.hot) {
  module.hot.dispose(stopReportingRuntimeErrors)
}
