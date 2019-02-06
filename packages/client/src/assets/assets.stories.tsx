import React from 'react'
import { storiesOf } from '@storybook/react'
import Assets from './assets'
import ExpandLess from './expand-less.svg'
import ExpandMore from './expand-more.svg'
import SortDown from './sort-down.svg'
import SortUp from './sort-up.svg'
import UserCircle from './user-circle.svg'
import logoUrl from './logo.png'

const icons = [
  { Icon: ExpandLess, label: 'Expand Less' },
  { Icon: ExpandMore, label: 'Expand More' },
  { Icon: SortDown, label: 'Sort Down' },
  { Icon: SortUp, label: 'Sort Up' },
  { Icon: UserCircle, label: 'User Circle' },
]

const images = [{ label: 'Logo', src: logoUrl }]

storiesOf('Assets|Icons', module).add('Default', () => (
  <Assets assets={icons} type="icon" />
))

storiesOf('Assets|Images', module).add('Default', () => (
  <Assets assets={images} type="image" />
))
