import React from 'react'

import Loading from 'components/loading'

interface Options {
  delay?: number
}

export const renderLoadingIf = (
  isLoading: boolean,
  componentFactory: <Props = any>() => React.ReactElement<Props> | null,
  options: Options = {}
) => (isLoading ? <Loading {...options} /> : componentFactory())

export const renderLoadingUnless = (
  isLoading: boolean,
  componentFactory: <Props = any>() => React.ReactElement<Props> | null,
  options?: Options
) => renderLoadingIf(!isLoading, componentFactory, options)
