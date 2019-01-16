import React from 'react'
import { storiesOf } from '@storybook/react'
import Assets from './assets'
import CaretDown from './caret-down.svg'
import CaretUp from './caret-up.svg'

const icons = [
  { Icon: CaretDown, label: 'Caret Down' },
  { Icon: CaretUp, label: 'Caret Up' },
]

storiesOf('Assets|Icons', module)
  .addParameters({ info: { disable: true } })
  .add('Default', () => <Assets assets={icons} type="icon" />)
