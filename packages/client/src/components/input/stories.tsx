import React from 'react'
import centered from '@storybook/addon-centered/react'
import { Formik } from 'formik'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Input from '.'

const initialValues = { input: '' }

storiesOf('Components|Input', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      <Input
        id="8a3cd8cd-4375-4c2c-b54e-fdbc796a33c5"
        isDisabled={boolean('Is Disabled', false)}
        isRequired={boolean('Is Required', true)}
        label={text('Label', 'Label')}
        name="input"
        placeholder={text('Placeholder', 'Placeholder')}
      />
    </Formik>
  ))
