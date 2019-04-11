import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from 'react-testing-library'

import { createTheme } from 'utilities/style'
import Notice from '.'

test('should render the default variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={createTheme()}>
      <Notice>child</Notice>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={createTheme()}>
      <Notice variant="danger">child</Notice>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the success variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={createTheme()}>
      <Notice variant="success">child</Notice>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
