import { storiesOf } from '@storybook/react'
import React from 'react'

import ExpandLess from './expand-less.svg'
import ExpandMore from './expand-more.svg'
import logoUrl from './logo.png'
import UserCircle from './user-circle.svg'
import Assets from '.'

const icons = [
  { Icon: ExpandLess, label: 'Expand Less' },
  { Icon: ExpandMore, label: 'Expand More' },
  { Icon: UserCircle, label: 'User Circle' },
]

const images = [{ label: 'Logo', src: logoUrl }]

storiesOf('Assets|Icons', module).add('Default', () => (
  <Assets assets={icons} type="icon" />
))

storiesOf('Assets|Images', module).add('Default', () => (
  <Assets assets={images} type="image" />
))
