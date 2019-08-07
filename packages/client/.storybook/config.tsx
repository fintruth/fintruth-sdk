import { withA11y } from '@storybook/addon-a11y'
import { PANEL_ID, withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator, addParameters, configure } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'
import { homepage, name } from '../package.json'

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
    selectedPanel: PANEL_ID,
    // @ts-ignore 2322
    theme: { brandTitle: name, brandUrl: homepage },
  },
  viewport: { viewports: INITIAL_VIEWPORTS },
})

configure(require.context('../src', true, /(.*\.)?stories\.tsx$/), module)
