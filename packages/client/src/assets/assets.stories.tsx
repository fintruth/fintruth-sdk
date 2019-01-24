import React from 'react'
import { storiesOf } from '@storybook/react'
import Assets from './assets'
import CaretDown from './caret-down.svg'
import CaretUp from './caret-up.svg'
import logoUrl from './logo.png'

const icons = [
  { Icon: CaretDown, label: 'Caret Down' },
  { Icon: CaretUp, label: 'Caret Up' },
]

const images = [{ label: 'Logo', src: logoUrl }]

storiesOf('Assets|Icons', module).add('Default', () => (
  <Assets assets={icons} type="icon" />
))

storiesOf('Assets|Images', module).add('Default', () => (
  <Assets assets={images} type="image" />
))
