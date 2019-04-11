import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Label from '.'

storiesOf('Components|Label', module).addCentered('Default', () => (
  <Label isRequired={boolean('Is Required', false)}>
    {text('Content', 'Label')}
  </Label>
))
