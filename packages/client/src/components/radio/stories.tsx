import React from 'react'
import centered from '@storybook/addon-centered/react'
import { Formik } from 'formik'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Radio from '.'

const initialValues = { radioGroup: 'radio-a' }

storiesOf('Components|Radio ', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Formik initialValues={initialValues} onSubmit={action('On Submit')}>
      <React.Fragment>
        <Radio
          id="f524dabc-13b6-4fa2-b633-2a852b28b39a"
          isDisabled={boolean('Is Disabled (Radio A)', false, 'Radio A')}
          label={text('Label (Radio A)', 'Radio A', 'Radio A')}
          name="radioGroup"
          value="radio-a"
        />
        <Radio
          id="53394530-d091-4a93-be90-351df19d704c"
          isDisabled={boolean('Is Disabled (Radio B)', false, 'Radio B')}
          label={text('Label (Radio B)', 'Radio B', 'Radio B')}
          name="radioGroup"
          value="radio-b"
        />
      </React.Fragment>
    </Formik>
  ))
