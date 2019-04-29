import React from 'react'
import centered from '@storybook/addon-centered/react'
import { Formik } from 'formik'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import ControlledInputField from '.'

const initialValues = { title: '' }

storiesOf('Components|Controlled Input Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      {() => (
        <ControlledInputField
          id="8a3cd8cd-4375-4c2c-b54e-fdbc796a33c5"
          isRequired={boolean('Is Required', true)}
          label={text('Label', 'Title')}
          name="title"
          placeholder={text('Placeholder', 'Current position')}
        />
      )}
    </Formik>
  ))
