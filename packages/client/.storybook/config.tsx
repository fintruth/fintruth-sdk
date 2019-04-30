import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { ThemeProvider } from 'styled-components'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'

import GlobalStyle from 'styles/global'
import { createTheme } from 'utilities/style'

const req = require.context('../src', true, /(.*\.)?stories\.tsx$/)

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(story => (
  <ThemeProvider theme={createTheme()}>
    <React.Fragment>
      <GlobalStyle />
      {story()}
    </React.Fragment>
  </ThemeProvider>
))

addParameters({
  options: {
    brandTitle: '@fintruth-sdk/client',
    brandUrl:
      'https://github.com/fintruth/fintruth-sdk/tree/develop/packages/client#readme',
    selectedAddonPanel: 'storybooks/knobs/panel',
  },
  viewports: { ...INITIAL_VIEWPORTS },
})

configure(() => req.keys().forEach(filename => req(filename)), module)
