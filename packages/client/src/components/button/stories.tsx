import React from 'react'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Button, { Status } from '.'

const options: Record<string, Status> = {
  Danger: 'danger',
  Default: 'default',
  Primary: 'primary',
}

storiesOf('Components|Button', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Button
      delay={number('Delay', 200)}
      isLoading={boolean('Is Loading', false)}
      isOutlined={boolean('Is Outlined', false)}
      onClick={action('On Click')}
      status={select('Status', options, 'default')}
    >
      {text('Content', 'Button')}
    </Button>
  ))
