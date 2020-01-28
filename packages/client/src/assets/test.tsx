import { screen } from '@testing-library/react'
import React from 'react'

import { renderWithContext } from 'utils/spec'
import FixtureIcon from './fixture.svg'
import fixtureUrl from './fixture.png'
import Assets from '.'

test('should render icons correctly', () => {
  const icons = [{ Icon: FixtureIcon, label: 'Fixture' }]

  renderWithContext(<Assets assets={icons} type="icon" />)

  expect(screen.getByText('fixture.svg')).toBeInTheDocument()
  expect(screen.getByText('Fixture')).toBeInTheDocument()
})

test('should render images correctly', () => {
  const images = [{ label: 'Fixture', src: fixtureUrl }]

  renderWithContext(<Assets assets={images} type="image" />)

  expect(screen.getByAltText('Fixture')).toHaveAttribute('src', 'fixture.png')
  expect(screen.getByText('Fixture')).toBeInTheDocument()
})

test('should render incorrectly if an invalid type is provided', () => {
  const icons = [{ Icon: FixtureIcon, label: 'Fixture' }]

  renderWithContext(<Assets assets={icons} type="icn" />)

  expect(screen.queryByText('fixture.svg')).not.toBeInTheDocument()
  expect(screen.getByText('Fixture')).toBeInTheDocument()
})
