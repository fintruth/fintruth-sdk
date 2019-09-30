import React from 'react'

import { renderWithContext } from 'utils/specification'
import Input from '.'

test('should render correctly', () => {
  const { container } = renderWithContext(<Input />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when disabled', () => {
  const { container } = renderWithContext(<Input isDisabled />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { container } = renderWithContext(<Input variant="danger" />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when disabled', () => {
  const { container } = renderWithContext(<Input isDisabled variant="danger" />)

  expect(container.firstChild).toMatchSnapshot()
})
