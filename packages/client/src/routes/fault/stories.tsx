import React from 'react'
import { storiesOf } from '@storybook/react'

import Fault from '.'

storiesOf('Routes|Fault', module)
  .add('Default', () => <Fault />)
  .add('With Error', () => <Fault error={new Error('Segmentation Fault')} />)
