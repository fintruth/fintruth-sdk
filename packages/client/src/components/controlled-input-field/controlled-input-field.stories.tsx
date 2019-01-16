import React from 'react'
import { Formik } from 'formik'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import ControlledInputField from '.'

const initialValues = { title: '' }

storiesOf('Components|Controlled Input Field', module).addCentered(
  'Default',
  () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      {() => (
        <ControlledInputField
          id="00000000-0000-0000-0000-000000000000"
          isRequired={boolean('Is Required', false)}
          label={text('Label', 'Title')}
          name="title"
          placeholder={text('Placeholder', 'Current position')}
        />
      )}
    </Formik>
  )
)
