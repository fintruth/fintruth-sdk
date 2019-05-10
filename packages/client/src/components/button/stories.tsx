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
      delay={number('Delay', 200)}
      isDisabled={boolean('Is Disabled', false)}
      isInverted={boolean('Is Inverted', false)}
      isLoading={boolean('Is Loading', false)}
      isOutlined={boolean('Is Outlined', false)}
      onClick={action('On Click')}
      variant={select('Variant', options, '') || undefined}
    >
      {text('Content', 'Button')}
    </Button>
  ))
