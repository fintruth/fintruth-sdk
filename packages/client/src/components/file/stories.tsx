import React from 'react'
import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import File from '.'

storiesOf('Components|File ', module)
  .addDecorator(centered)
  .add('Default', () => (
    <File
      id="eee831ee-f009-4816-b8b2-9c953a7790b3"
      label={text('Label', 'Choose File')}
      name="file"
      value={text('Value', '')}
    />
  ))
