import React from 'react'
import { act, render } from 'react-testing-library'

import Button from '.'

jest.useFakeTimers()

test('should initialize the loading state once the provided delay (ms) has passed', () => {
  const { queryByTestId } = render(<Button isLoading>child</Button>)

  expect(queryByTestId('spinner')).not.toBeInTheDocument()

  act(() => jest.runOnlyPendingTimers())

  expect(queryByTestId('spinner')).toBeInTheDocument()
})

test('should render the default style correctly', () => {
  const { container } = render(<Button>child</Button>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the default style correctly when outlined', () => {
  const { container } = render(<Button isOutlined>child</Button>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger style correctly', () => {
  const { container } = render(<Button status="danger">child</Button>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger style correctly when outlined', () => {
  const { container } = render(
    <Button isOutlined status="danger">
      child
    </Button>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the primary style correctly', () => {
  const { container } = render(<Button status="primary">child</Button>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the primary style correctly when outlined', () => {
  const { container } = render(
    <Button isOutlined status="primary">
      child
    </Button>
  )

  expect(container.firstChild).toMatchSnapshot()
})
