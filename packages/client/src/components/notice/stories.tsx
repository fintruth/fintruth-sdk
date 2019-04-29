import React from 'react'
import centered from '@storybook/addon-centered/react'
import { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Notice from '.'

const options: Record<string, NoticeVariant> = {
  Default: 'default',
  Danger: 'danger',
  Success: 'success',
}

storiesOf('Components|Notice', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Notice variant={select('Variant', options, 'default')}>
      {text('Content', 'The user already exists')}
    </Notice>
  ))
