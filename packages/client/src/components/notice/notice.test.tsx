import React from 'react'
import { render } from 'react-testing-library'
import Notice from '.'

test('should render the default style correctly', () => {
  const { container } = render(<Notice>child</Notice>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the failure style correctly', () => {
  const { container } = render(<Notice status="failure">child</Notice>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the success style correctly', () => {
  const { container } = render(<Notice status="success">child</Notice>)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the default style if an invalid status is provided', () => {
  const { container } = render(<Notice status="defaut">child</Notice>)

  expect(container.firstChild).toMatchSnapshot()
})
