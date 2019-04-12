import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from 'react-testing-library'

import { createTheme } from 'utilities/style'
import Label from '.'

test('should not append the required symbol to the provided children', () => {
  const { getByText } = render(
    <ThemeProvider theme={createTheme()}>
      <Label data-testid="label">child</Label>
    </ThemeProvider>
  )

  expect(getByText('child')).toHaveAttribute('data-testid', 'label')
})

test('should append the required symbol to the provided children', () => {
  const { getByText } = render(
    <ThemeProvider theme={createTheme()}>
      <Label data-testid="label" isRequired>
        child
      </Label>
    </ThemeProvider>
  )

  expect(getByText('child*')).toHaveAttribute('data-testid', 'label')
})
