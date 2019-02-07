import React from 'react'

import Loading from 'components/loading'

interface Options {
  delay?: number
}

export const renderLoadingIf = (
  isLoading: boolean,
  componentFactory: <Props = {}>() => React.ReactElement<Props>,
  options: Options = {}
) => (isLoading ? <Loading {...options} /> : componentFactory())

export const renderLoadingUnless = (
  isLoading: boolean,
  componentFactory: <Props = {}>() => React.ReactElement<Props>,
  options?: Options
) => renderLoadingIf(!isLoading, componentFactory, options)
