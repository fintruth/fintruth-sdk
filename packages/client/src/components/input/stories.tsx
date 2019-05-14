import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import Input, { Type } from '.'

const initialValues = { input: '' }

const options: Type[] = ['email', 'password', 'tel', 'text']

storiesOf('Components|Input', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      <Input
        id="8a3cd8cd-4375-4c2c-b54e-fdbc796a33c5"
        isDisabled={boolean('isDisabled', false)}
        isLoading={boolean('isLoading', false)}
        isRequired={boolean('isRequired', true)}
        label={text('label', 'Label')}
        name="input"
        placeholder={text('placeholder', 'Placeholder')}
        type={select('type', options, 'text')}
      />
    </Formik>
  ))
