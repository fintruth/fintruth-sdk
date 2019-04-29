import React from 'react'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import Subnavbar from '.'

const items = [
  { id: 'a', content: 'Human Resources', to: '/human-resources' },
  { id: 'b', content: 'Sales', to: '/sales' },
  { id: 'c', content: 'Accounting', to: '/accounting' },
]

storiesOf('Components|Subnavbar', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Subnavbar items={items} onItemClick={action('On Item Click')} />
  ))
