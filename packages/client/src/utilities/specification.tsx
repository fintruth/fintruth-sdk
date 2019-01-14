import React from 'react'
import {
  LocationProvider,
  LocationProviderRenderFn, // eslint-disable-line import/named
  createHistory,
  createMemorySource,
} from '@reach/router'
import { render } from 'react-testing-library'

interface RouterOptions {
  initialPath?: string
}

export const renderWithRouter = (
  node: React.ReactNode | LocationProviderRenderFn,
  { initialPath = '/' }: RouterOptions = {}
) => {
  const history = createHistory(createMemorySource(initialPath))

  return {
    ...render(<LocationProvider history={history}>{node}</LocationProvider>),
    history,
  }
}
