import React from 'react'

import { renderWithContext } from 'utils/spec'
import Select from '.'

test('should render correctly', () => {
  const { firstChild } = renderWithContext(<Select />).container

  expect(firstChild).toMatchSnapshot()
})

test('should render correctly when disabled', () => {
  const { firstChild } = renderWithContext(<Select isDisabled />).container

  expect(firstChild).toMatchSnapshot()
})

test('should render correctly when disabled and multiple', () => {
  const { firstChild } = renderWithContext(
    <Select isDisabled isMultiple />
  ).container

  expect(firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly', () => {
  const { firstChild } = renderWithContext(
    <Select variant="danger" />
  ).container

  expect(firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when disabled', () => {
  const { firstChild } = renderWithContext(
    <Select isDisabled variant="danger" />
  ).container

  expect(firstChild).toMatchSnapshot()
})

test('should render the danger variant correctly when multiple', () => {
  const { firstChild } = renderWithContext(
    <Select isMultiple variant="danger" />
  ).container

  expect(firstChild).toMatchSnapshot()
})
