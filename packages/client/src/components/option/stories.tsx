import centered from '@storybook/addon-centered/react'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Option from '.'

storiesOf('Components|Option', module)
  .addDecorator(centered)
  .add('Default', () => <Option>{text('children', 'Option')}</Option>)
