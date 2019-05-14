import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import File from '.'

const initialValues = { file: '' }

storiesOf('Components|File ', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      <File
        id="eee831ee-f009-4816-b8b2-9c953a7790b3"
        label={text('label', 'Choose File')}
        name="file"
      />
    </Formik>
  ))
