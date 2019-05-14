import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Button from '.'

test('should render correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button>child</Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when inverted', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isInverted>child</Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when outlined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isOutlined>child</Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when inverted and outlined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isInverted isOutlined>
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the primary variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button variant="primary">child</Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the primary variant correctly when inverted', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isInverted variant="primary">
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the primary variant correctly when outlined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isOutlined variant="primary">
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the primary variant correctly when inverted and outlined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isInverted isOutlined variant="primary">
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button variant="danger">child</Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when inverted', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isInverted variant="danger">
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when outlined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isOutlined variant="danger">
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when inverted and outlined', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button isInverted isOutlined variant="danger">
        child
      </Button>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
