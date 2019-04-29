import React from 'react'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import InputField, { Status } from '.'

const options: Record<string, Status> = {
  Default: 'default',
  Failure: 'failure',
}

storiesOf('Components|Input Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <InputField
      id="f041106a-d438-462a-b129-11bfd35fa381"
      isRequired={boolean('Is Required', true)}
      label={text('Label', 'Title')}
      notice={text('Notice', '')}
      onBlur={action('On Blur')}
      onChange={action('On Change')}
      placeholder={text('Placeholder', 'Current position')}
      status={select('Status', options, 'default')}
      value={text('Value', '')}
    />
  ))
