import { action } from '@storybook/addon-actions'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { centered } from 'utils/story'
import Button, { Variant } from '.'

const options: Record<string, Variant | ''> = {
  default: '',
  primary: 'primary',
  danger: 'danger',
}

storiesOf('Components|Button', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Button
      delay={number('delay', 200)}
      isDisabled={boolean('isDisabled', false)}
      isInverted={boolean('isInverted', false)}
      isLoading={boolean('isLoading', false)}
      isOutlined={boolean('isOutlined', false)}
      onClick={action('onClick')}
      variant={select<Variant | ''>('variant', options, '') || undefined}
    >
      {text('children', 'Button')}
    </Button>
  ))
