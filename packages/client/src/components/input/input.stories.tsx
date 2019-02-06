import React from 'react'
import { action } from '@storybook/addon-actions'
import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Input from '.'

const options = { Default: 'default', Failure: 'failure' }

storiesOf('Components|Input', module).addCentered('Default', () => (
  <Input
    onBlur={action('On Blur')}
    onChange={action('On Change')}
    placeholder={text('Placeholder', 'Current position')}
    status={select('Status', options, 'default')}
    value={text('Value', '')}
  />
))
