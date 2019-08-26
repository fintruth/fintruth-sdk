import { withA11y } from '@storybook/addon-a11y'
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks'
import { PANEL_ID, withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator, addParameters, configure } from '@storybook/react'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(story => (
  <IntlProvider locale="en">
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {story()}
      </>
    </ThemeProvider>
  </IntlProvider>
))

addParameters({
  options: {
    docs: DocsPage,
    docsContainer: DocsContainer,
    selectedPanel: PANEL_ID,
    theme: {
      brandTitle: '@fintruth-sdk/client',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore 2322
      brandUrl:
        'https://github.com/fintruth/fintruth-sdk/tree/develop/packages/client#readme',
    },
  },
  viewport: { viewports: INITIAL_VIEWPORTS },
})

configure(require.context('../src', true, /(.*\.)?stories\.(mdx|tsx)$/), module)
