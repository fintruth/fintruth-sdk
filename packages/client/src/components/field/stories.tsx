import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import { Type } from 'components/input'
import Option from 'components/option'
import Field, { FieldHelp, FieldInput, FieldLabel, FieldSelect } from '.'

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

storiesOf('Components|Field', module)
  .addDecorator(centered)
  .add('Input', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <Field isRequired={boolean('isRequired', true)} name="text">
        <FieldLabel>{text('label', 'Label')}</FieldLabel>
        <FieldInput
          delay={number('delay', 200)}
          isDisabled={boolean('isDisabled', false)}
          isLoading={boolean('isLoading', false)}
          placeholder={text('placeholder', 'Placeholder')}
          type={select('type', types, '') || undefined}
        />
        <FieldHelp />
      </Field>
    </Formik>
  ))
  .add('Select', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <Field isRequired={boolean('isRequired', true)} name="text">
        <FieldLabel>{text('label', 'Label')}</FieldLabel>
        <FieldSelect
          delay={number('delay', 200)}
          isDisabled={boolean('isDisabled', false)}
          isLoading={boolean('isLoading', false)}
          isMultiple={boolean('isMultiple', false)}
        >
          <Option value="optionA">Option A</Option>
          <Option value="optionB">Option B</Option>
          <Option value="optionC">Option C</Option>
          <Option value="optionD">Option D</Option>
        </FieldSelect>
        <FieldHelp />
      </Field>
    </Formik>
  ))
