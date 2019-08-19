import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import Radio, { RadioInput, RadioLabel } from '.'

interface Values {
  radioGroup: string
}

const initialValues: Values = { radioGroup: 'radio-a' }

storiesOf('Components|Radio ', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('onSubmit')}>
      <>
        <Radio
          isDisabled={boolean('isDisabled', false, 'Radio A')}
          name="radioGroup"
        >
          <RadioInput value="radio-a" />
          <RadioLabel>{text('label', 'Radio A', 'Radio A')}</RadioLabel>
        </Radio>
        <Radio
          isDisabled={boolean('isDisabled', false, 'Radio B')}
          name="radioGroup"
        >
          <RadioInput value="radio-b" />
          <RadioLabel>{text('label', 'Radio B', 'Radio B')}</RadioLabel>
        </Radio>
      </>
    </Formik>
  ))
