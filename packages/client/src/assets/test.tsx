import { render } from '@testing-library/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Fixture from './fixture.svg'
import fixtureUrl from './fixture.png'
import Assets from '.'

test('should render icons correctly', () => {
  const icons = [{ Icon: Fixture, label: 'Fixture' }]
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Assets assets={icons} type="icon" />
    </ThemeProvider>
  )

  expect(getByText('fixture.svg')).toBeInTheDocument()
  expect(getByText('Fixture')).toBeInTheDocument()
})

test('should render images correctly', () => {
  const images = [{ label: 'Fixture', src: fixtureUrl }]
  const { getByAltText, getByText } = render(
    <ThemeProvider theme={theme}>
      <Assets assets={images} type="image" />
    </ThemeProvider>
  )

  expect(getByAltText('Fixture')).toHaveAttribute('src', 'fixture.png')
  expect(getByText('Fixture')).toBeInTheDocument()
})

test('should render incorrectly if an invalid type is provided', () => {
  const icons = [{ Icon: Fixture, label: 'Fixture' }]
  const { getByText, queryByText } = render(
    <ThemeProvider theme={theme}>
      <Assets assets={icons} type="icn" />
    </ThemeProvider>
  )

  expect(queryByText('fixture.svg')).not.toBeInTheDocument()
  expect(getByText('Fixture')).toBeInTheDocument()
})
