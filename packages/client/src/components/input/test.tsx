import { render } from '@testing-library/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Input from '.'

test('should render correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Input />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when disabled', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Input isDisabled />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Input variant="danger" />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when disabled', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Input isDisabled variant="danger" />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
