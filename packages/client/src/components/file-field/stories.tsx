import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import FileField, {
  FileFieldCallToAction,
  FileFieldHelp,
  FileFieldIcon,
  FileFieldLabel,
  FileFieldName,
  Variant,
  containerHorizontal,
  ctaHorizontalLeft,
  nameHorizontalRight,
} from '.'

interface Values {
  file: File | string
}

const initialValues: Values = { file: '' }

const variants: Record<string, Variant | ''> = {
  default: '',
  primary: 'primary',
  danger: 'danger',
}

storiesOf('Components|File Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <FileField
        isDisabled={boolean('isDisabled', false)}
        isRequired={boolean('isRequired', true)}
        name="file"
      >
        <FileFieldCallToAction
          variant={select('variant', variants, '') || undefined}
        >
          <FileFieldIcon />
          <FileFieldLabel>{text('label', 'Label')}</FileFieldLabel>
        </FileFieldCallToAction>
        <FileFieldName />
        <FileFieldHelp />
      </FileField>
    </Formik>
  ))
  .add('Horizontal', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <FileField
        isDisabled={boolean('isDisabled', false)}
        isRequired={boolean('isRequired', true)}
        name="file"
      >
        <div css={containerHorizontal}>
          <FileFieldCallToAction
            css={ctaHorizontalLeft}
            variant={select('variant', variants, '') || undefined}
          >
            <FileFieldIcon />
            <FileFieldLabel>{text('label', 'Label')}</FileFieldLabel>
          </FileFieldCallToAction>
          <FileFieldName css={nameHorizontalRight} />
        </div>
        <FileFieldHelp />
      </FileField>
    </Formik>
  ))
