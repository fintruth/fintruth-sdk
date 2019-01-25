import React from 'react'
import centered from '@storybook/addon-centered'
import {
  Context, // eslint-disable-line import/named
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

const req = require.context('../src', true, /\.stories\.tsx$/)

setAddon({
  addCentered(storyName: string, callback: RenderFunction) {
    return (this as Story).add(storyName, (context: Context) =>
      centered.call(context, callback, context)
    )
  },
})

addDecorator(withA11Y)
addDecorator(withKnobs)
addDecorator((story: RenderFunction) => (
  <React.Fragment>
    <GlobalStyle />
    {story()}
  </React.Fragment>
))

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
    name: '@fintruth-sdk/client',
    selectedPanel: 'storybooks/knobs/panel',
    url: 'https://github.com/fintruth/fintruth-sdk/tree/master/packages/client',
  },
})

configure(() => req.keys().forEach((filename: string) => req(filename)), module)
