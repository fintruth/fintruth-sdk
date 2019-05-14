import centered from '@storybook/addon-centered/react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Label from '.'

storiesOf('Components|Label', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Label isRequired={boolean('isRequired', false)}>
      {text('children', 'Label')}
    </Label>
  ))
