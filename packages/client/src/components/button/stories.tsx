import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { ButtonVariant } from 'styled-components' // eslint-disable-line import/named
import React from 'react'

import Button from '.'

const options: Record<string, ButtonVariant | ''> = {
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
      variant={select('variant', options, '') || undefined}
    >
      {text('children', 'Button')}
    </Button>
  ))
