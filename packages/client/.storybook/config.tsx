import React from 'react'
import centered from '@storybook/addon-centered/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import {
  RenderFunction, // eslint-disable-line import/named
  Story, // eslint-disable-line import/named
  addDecorator,
  addParameters,
  configure,
  setAddon,
} from '@storybook/react'
import { withA11Y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'

import GlobalStyle from 'styles/global'

const req = require.context('../src', true, /(.*\.)?stories\.tsx$/)

setAddon({
  addCentered(storyName: string, callback: RenderFunction) {
    return (this as Story).add(storyName, context =>
      centered.call(context, callback, context)
    )
  },
})

addDecorator(withA11Y)
addDecorator(withKnobs)
addDecorator(story => (
  <React.Fragment>
    <GlobalStyle />
    {story()}
  </React.Fragment>
))

addParameters({
  options: {
    name: '@fintruth-sdk/client',
    selectedAddonPanel: 'storybooks/knobs',
    url:
      'https://github.com/fintruth/fintruth-sdk/tree/master/packages/client#readme',
  },
  viewports: { ...INITIAL_VIEWPORTS },
})

configure(() => req.keys().forEach(filename => req(filename)), module)
