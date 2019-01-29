import React from 'react'
import { flushEffects, render } from 'react-testing-library'
import Loading from '.'

jest.useFakeTimers()

test('should render once the provided delay (ms) has passed', () => {
  const { queryByTestId } = render(<Loading data-testid="loading" />)

  flushEffects()
  expect(queryByTestId('loading')).not.toBeInTheDocument()

  jest.runOnlyPendingTimers()

  expect(queryByTestId('loading')).toBeInTheDocument()
})
