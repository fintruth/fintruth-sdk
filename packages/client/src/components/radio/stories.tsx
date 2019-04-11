import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Radio from '.'

storiesOf('Components|Radio ', module).addCentered('Default', () => (
  <React.Fragment>
    <Radio
      id="f524dabc-13b6-4fa2-b633-2a852b28b39a"
      isDisabled={boolean('Is Disabled (Radio A)', false)}
      label={text('Label (Radio A)', 'Radio A')}
      name="radio"
    />
    <Radio
      id="53394530-d091-4a93-be90-351df19d704c"
      isDisabled={boolean('Is Disabled (Radio B)', false)}
      label={text('Label (Radio B)', 'Radio B')}
      name="radio"
    />
  </React.Fragment>
))
