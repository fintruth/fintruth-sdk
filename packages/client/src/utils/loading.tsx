import React from 'react'

import Loading from 'components/loading'

interface Options {
  delay?: number
}

export const renderLoadingIf = (
  isLoading: boolean,
  componentFactory: () => React.ReactNode,
  options: Options = {}
) => (isLoading ? <Loading {...options} /> : componentFactory())

export const renderLoadingUnless = (
  isLoading: boolean,
  componentFactory: () => React.ReactNode,
  options?: Options
) => renderLoadingIf(!isLoading, componentFactory, options)
