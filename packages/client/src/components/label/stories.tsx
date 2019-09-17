import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { centered } from 'utils/story'
import Label from '.'

storiesOf('Components|Label', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Label isRequired={boolean('isRequired', false)}>
      {text('children', 'Label')}
    </Label>
  ))
