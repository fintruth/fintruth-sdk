import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import PhoneField, {
  PhoneFieldHelp,
  PhoneFieldInput,
  PhoneFieldLabel,
  PhoneFieldSelect,
  PhoneValue,
} from '.'

interface Values {
  phone: PhoneValue
}

const initialValues: Values = {
  phone: {
    alpha2Code: 'US',
    callingCode: '1',
    countryName: 'United States',
    number: '',
  },
}

storiesOf('Components|Phone Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <PhoneField isRequired={boolean('isRequired', true)} name="phone">
        <PhoneFieldLabel>{text('label', 'Label')}</PhoneFieldLabel>
        <PhoneFieldSelect />
        <PhoneFieldInput
          isDisabled={boolean('isDisabled', false)}
          isLoading={boolean('isLoading', false)}
        />
        <PhoneFieldHelp />
      </PhoneField>
    </Formik>
  ))
