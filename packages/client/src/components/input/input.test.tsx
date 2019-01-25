import React from 'react'
import { render } from 'react-testing-library'
import Input from '.'

test('should render the default style correctly', () => {
  const { container } = render(<Input />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the failure style correctly', () => {
  const { container } = render(<Input status="failure" />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the default style if an invalid status is provided', () => {
  const { container } = render(<Input status="defaut" />)

  expect(container.firstChild).toMatchSnapshot()
})
