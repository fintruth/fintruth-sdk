import { render } from '@testing-library/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Select from '.'

test('should render correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Select />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when disabled', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Select isDisabled />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when disabled and multiple', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Select isDisabled isMultiple />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Select variant="danger" />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when disabled', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Select isDisabled variant="danger" />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when multiple', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Select isMultiple variant="danger" />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
