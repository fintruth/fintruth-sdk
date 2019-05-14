import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Label from '.'

test('should not append the required symbol to the provided children', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Label data-testid="label">child</Label>
    </ThemeProvider>
  )

  expect(getByText('child')).toHaveAttribute('data-testid', 'label')
})

test('should append the required symbol to the provided children', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Label data-testid="label" isRequired>
        child
      </Label>
    </ThemeProvider>
  )

  expect(getByText('child*')).toHaveAttribute('data-testid', 'label')
})
