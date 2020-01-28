import React from 'react'

import { renderWithContext } from 'utils/spec'
import Input from '.'

test('should render correctly', () => {
  const { firstChild } = renderWithContext(<Input />).container

  expect(firstChild).toMatchSnapshot()
})

test('should render correctly when disabled', () => {
  const { firstChild } = renderWithContext(<Input isDisabled />).container

  expect(firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { firstChild } = renderWithContext(<Input variant="danger" />).container

  expect(firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when disabled', () => {
  const { firstChild } = renderWithContext(
    <Input isDisabled variant="danger" />
  ).container

  expect(firstChild).toMatchSnapshot()
})
