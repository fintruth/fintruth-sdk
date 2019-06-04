import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator, addParameters, load } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(story => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      {story()}
    </React.Fragment>
  </ThemeProvider>
))

addParameters({
  options: {
    selectedPanel: 'storybooks/knobs/panel',
    theme: {
      brandTitle: '@fintruth-sdk/client',
      brandUrl:
        'https://github.com/fintruth/fintruth-sdk/tree/develop/packages/client#readme',
    },
  },
  viewports: { ...INITIAL_VIEWPORTS },
})

load(require.context('../src', true, /(.*\.)?stories\.(md|ts)x$/), module)
