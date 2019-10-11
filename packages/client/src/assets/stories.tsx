import { storiesOf } from '@storybook/react'
import React from 'react'

import ExpandLessIcon from './expand-less.svg'
import ExpandMoreIcon from './expand-more.svg'
import logoUrl from './logo.png'
import UserCircleIcon from './user-circle.svg'
import Assets from '.'

const icons = [
  { Icon: ExpandLessIcon, label: 'Expand Less' },
  { Icon: ExpandMoreIcon, label: 'Expand More' },
  { Icon: UserCircleIcon, label: 'User Circle' },
]

const images = [{ label: 'Logo', src: logoUrl }]

storiesOf('Assets|Icons', module).add('Default', () => (
  <Assets assets={icons} type="icon" />
))

storiesOf('Assets|Images', module).add('Default', () => (
  <Assets assets={images} type="image" />
))
