import { act, render } from '@testing-library/react'
import React from 'react'

import Loading from '.'

jest.useFakeTimers()

test('should render once the provided delay (ms) has passed', () => {
  const { getByTestId, queryByTestId } = render(
    <Loading data-testid="loading" />
  )

  expect(queryByTestId('loading')).not.toBeInTheDocument()

  act(() => {
    jest.runOnlyPendingTimers()
  })

  expect(getByTestId('loading')).toBeInTheDocument()
})
