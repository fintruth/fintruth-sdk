import React from 'react'
import { render } from 'react-testing-library'

import Button from '.'

test('should render the default style correctly', () => {
  const { container } = render(<Button>child</Button>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the default style correctly when outlined', () => {
  const { container } = render(<Button isOutlined>child</Button>)

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

test('should render the default style if an invalid status is provided', () => {
  const { container } = render(<Button status="defaut">child</Button>)

  expect(container.firstChild).toMatchSnapshot()
})
