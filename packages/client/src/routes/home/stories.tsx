import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'

import Home from '.'

storiesOf('Routes|Home', module).add('Default', () => (
  <MockedProvider addTypename={false}>
    <Home />
  </MockedProvider>
))
