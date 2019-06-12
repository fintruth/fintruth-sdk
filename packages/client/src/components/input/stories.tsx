import centered from '@storybook/addon-centered/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Input, { Type, Variant } from '.'

const types: Record<string, Type | ''> = {
  default: '',
  email: 'email',
  password: 'password',
  tel: 'tel',
  text: 'text',
}

const variants: Record<string, Variant | ''> = {
  default: '',
  danger: 'danger',
}

storiesOf('Components|Input', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Input
      isDisabled={boolean('isDisabled', false)}
      placeholder={text('placeholder', 'Placeholder')}
      type={select('type', types, '') || undefined}
      variant={select('variant', variants, '') || undefined}
    />
  ))
