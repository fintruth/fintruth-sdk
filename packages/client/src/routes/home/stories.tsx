import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import Home from '.'

storiesOf('Routes|Home', module).add('Default', () => (
  <MockedProvider addTypename={false}>
    <Home />
  </MockedProvider>
))
