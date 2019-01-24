import React from 'react'
import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Notice from '.'

const options = { Default: 'default', Failure: 'failure', Success: 'success' }

storiesOf('Components|Notice', module).addCentered('Default', () => (
  <Notice status={select('Status', options, 'default')}>
    {text('Content', 'The user already exists')}
  </Notice>
))
