import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { createInMemoryCache } from 'utils/apollo'
import Home from '.'

storiesOf('Routes|Home', module).add('Default', () => (
  <MockedProvider cache={createInMemoryCache()}>
    <Home />
  </MockedProvider>
))
