import { MockedProvider } from '@apollo/react-testing'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { createFragmentMatcher, createInMemoryCache } from 'utilities/apollo'
import Home from '.'

const fragmentMatcher = createFragmentMatcher()

storiesOf('Routes|Home', module).add('Default', () => (
  <MockedProvider cache={createInMemoryCache({ fragmentMatcher })}>
    <Home />
  </MockedProvider>
))
