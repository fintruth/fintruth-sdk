import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button from '.'

const options = { Default: 'default', Primary: 'primary' }

storiesOf('Components|Button', module).addCentered('Default', () => (
  <Button
    isOutlined={boolean('Is Outlined', false)}
    onClick={action('On Click')}
    status={select('Status', options, 'default')}
  >
    {text('Content', 'Button')}
  </Button>
))
