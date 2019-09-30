import React from 'react'

import { renderWithContext } from 'utils/spec'
import Select from '.'

test('should render correctly', () => {
  const { container } = renderWithContext(<Select />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when disabled', () => {
  const { container } = renderWithContext(<Select isDisabled />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render correctly when disabled and multiple', () => {
  const { container } = renderWithContext(<Select isDisabled isMultiple />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { container } = renderWithContext(<Select variant="danger" />)

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when disabled', () => {
  const { container } = renderWithContext(
    <Select isDisabled variant="danger" />
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when multiple', () => {
  const { container } = renderWithContext(
    <Select isMultiple variant="danger" />
  )

  expect(container.firstChild).toMatchSnapshot()
})
