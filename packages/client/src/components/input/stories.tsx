import centered from '@storybook/addon-centered/react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Input, { Type, Variant } from '.'

const masks: Record<string, (RegExp | string)[] | ''> = {
  default: '',
  'credit card': [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
}

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
      delay={number('delay', 200)}
      isDisabled={boolean('isDisabled', false)}
      isGuided={boolean('isGuided', true)}
      isLoading={boolean('isLoading', false)}
      // @ts-ignore 2344
      mask={select<(RegExp | string)[] | ''>('mask', masks, '') || undefined}
      placeholder={text('placeholder', 'Placeholder')}
      type={select<Type | ''>('type', types, '') || undefined}
      variant={select<Variant | ''>('variant', variants, '') || undefined}
    />
  ))
