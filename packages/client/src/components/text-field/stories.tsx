import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import { Type } from 'components/input'
import TextField, { TextFieldHelp, TextFieldInput, TextFieldLabel } from '.'

interface Values {
  text: string
}

const initialValues: Values = { text: '' }

const types: Record<string, Type | ''> = {
  default: '',
  email: 'email',
  password: 'password',
  tel: 'tel',
  text: 'text',
}

storiesOf('Components|Text Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <TextField isRequired={boolean('isRequired', true)} name="text">
        <TextFieldLabel>{text('label', 'Label')}</TextFieldLabel>
        <TextFieldInput
          isDisabled={boolean('isDisabled', false)}
          isLoading={boolean('isLoading', false)}
          placeholder={text('placeholder', 'Placeholder')}
          type={select('type', types, '') || undefined}
        />
        <TextFieldHelp />
      </TextField>
    </Formik>
  ))
