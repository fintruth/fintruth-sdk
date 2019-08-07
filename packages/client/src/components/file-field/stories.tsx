import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'
import styled from 'styled-components'

import FileField, {
  FileFieldCallToAction,
  FileFieldCropper,
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

const ContainerHorizontal = styled.div`
  ${containerHorizontal};
`

const FileFieldCallToActionHorizontal = styled(FileFieldCallToAction)`
  ${ctaHorizontalLeft};
`

const FileFieldNameHorizontal = styled(FileFieldName)`
  ${nameHorizontalRight};
`

storiesOf('Components|File Field', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <FileField
        fileName={text('fileName', '')}
        isDisabled={boolean('isDisabled', false)}
        isRequired={boolean('isRequired', true)}
        name="file"
      >
        <FileFieldCallToAction
          variant={select<Variant | ''>('variant', variants, '') || undefined}
        >
          <FileFieldIcon />
          <FileFieldLabel>{text('label', 'Label')}</FileFieldLabel>
        </FileFieldCallToAction>
        <FileFieldName />
        <FileFieldCropper alt="Cropped Image" />
        <FileFieldHelp />
      </FileField>
    </Formik>
  ))
  .add('Horizontal', () => (
    <Formik<Values> initialValues={initialValues} onSubmit={action('onSubmit')}>
      <FileField
        fileName={text('fileName', '')}
        isDisabled={boolean('isDisabled', false)}
        isRequired={boolean('isRequired', true)}
        name="file"
      >
        <ContainerHorizontal>
          <FileFieldCallToActionHorizontal
            variant={select<Variant | ''>('variant', variants, '') || undefined}
          >
            <FileFieldIcon />
            <FileFieldLabel>{text('label', 'Label')}</FileFieldLabel>
          </FileFieldCallToActionHorizontal>
          <FileFieldNameHorizontal />
        </ContainerHorizontal>
        <FileFieldCropper alt="Cropped Image" />
        <FileFieldHelp />
      </FileField>
    </Formik>
  ))
