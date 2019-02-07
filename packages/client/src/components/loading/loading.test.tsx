import React from 'react'
import { act, render } from 'react-testing-library'

import Loading from '.'

jest.useFakeTimers()

test('should render once the provided delay (ms) has passed', () => {
  const { queryByTestId } = render(<Loading data-testid="loading" />)

  expect(queryByTestId('loading')).not.toBeInTheDocument()

  act(() => jest.runOnlyPendingTimers())

  expect(queryByTestId('loading')).toBeInTheDocument()
})
