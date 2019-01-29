import React from 'react'
import { render } from 'react-testing-library'
import Assets from './assets'
import Fixture from './fixture.svg'
import fixtureUrl from './fixture.png'

test('should render icons correctly', () => {
  const icons = [{ Icon: Fixture, label: 'Fixture' }]
  const { getByText } = render(<Assets assets={icons} type="icon" />)

  expect(getByText('fixture.svg')).toBeInTheDocument()
  expect(getByText('Fixture')).toBeInTheDocument()
})

test('should render images correctly', () => {
  const images = [{ label: 'Fixture', src: fixtureUrl }]
  const { getByAltText, getByText } = render(
    <Assets assets={images} type="image" />
  )

  expect(getByAltText('Fixture')).toHaveAttribute('src', 'fixture.png')
  expect(getByText('Fixture')).toBeInTheDocument()
})

test('should render incorrectly if an invalid type is provided', () => {
  const icons = [{ Icon: Fixture, label: 'Fixture' }]
  const { getByText, queryByText } = render(
    <Assets assets={icons} type="icn" />
  )

  expect(queryByText('fixture.svg')).not.toBeInTheDocument()
  expect(getByText('Fixture')).toBeInTheDocument()
})
