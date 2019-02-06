import React from 'react'
import centered from '@storybook/addon-centered'
import {
  Context, // eslint-disable-line import/named
  RenderFunction, // eslint-disable-line import/named
  Story, // eslint-disable-line import/named
  addDecorator,
  configure,
  setAddon,
} from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { withOptions } from '@storybook/addon-options'
import { withViewport } from '@storybook/addon-viewport'

import GlobalStyle from 'styles/global'

const req = require.context('../src', true, /\.stories\.tsx$/)

setAddon({
  addCentered(storyName: string, callback: RenderFunction) {
    return (this as Story).add(storyName, (context: Context) =>
      centered.call(context, callback, context)
    )
  },
})

addDecorator(
  withOptions({
    hierarchyRootSeparator: /\|/,
    name: '@fintruth-sdk/client',
    selectedAddonPanel: 'storybooks/storybook-addon-knobs',
    url: 'https://github.com/fintruth/fintruth-sdk/tree/master/packages/client',
  })
)
addDecorator(checkA11y)
addDecorator(withKnobs)
addDecorator(withViewport())
addDecorator((story: RenderFunction) => (
  <React.Fragment>
    <GlobalStyle />
    {story()}
  </React.Fragment>
))

configure(() => req.keys().forEach((filename: string) => req(filename)), module)
