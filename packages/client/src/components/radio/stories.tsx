import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { Formik } from 'formik'
import React from 'react'

import Radio from '.'

const initialValues = { radioGroup: 'radio-a' }

storiesOf('Components|Radio ', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      <React.Fragment>
        <Radio
          id="f524dabc-13b6-4fa2-b633-2a852b28b39a"
          isDisabled={boolean('isDisabled', false, 'Radio A')}
          label={text('label', 'Radio A', 'Radio A')}
          name="radioGroup"
          value="radio-a"
        />
        <Radio
          id="53394530-d091-4a93-be90-351df19d704c"
          isDisabled={boolean('isDisabled', false, 'Radio B')}
          label={text('label', 'Radio B', 'Radio B')}
          name="radioGroup"
          value="radio-b"
        />
      </React.Fragment>
    </Formik>
  ))
