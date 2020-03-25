import { withA11y } from '@storybook/addon-a11y'
import { DocsContainer, DocsPage } from '@storybook/addon-docs/blocks'
import { PANEL_ID, withKnobs } from '@storybook/addon-knobs'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { Styles } from 'isomorphic-style-loader'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

const insertCss = (...styles: Styles[]) => {
  const removeCss = styles.map(({ _insertCss }) => _insertCss())

  return () => removeCss.forEach((dispose) => dispose())
}

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator((story) => (
  <IntlProvider defaultLocale="en" locale="en">
    <StyleContext.Provider value={{ insertCss }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {story()}
      </ThemeProvider>
    </StyleContext.Provider>
  </IntlProvider>
))

addParameters({
  options: {
    docs: { container: DocsContainer, page: DocsPage },
    selectedPanel: PANEL_ID,
    theme: {
      brandTitle: '@fintruth-sdk/client',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore TS2322
      brandUrl:
        'https://github.com/fintruth/fintruth-sdk/tree/develop/packages/client#readme',
    },
  },
  viewport: { viewports: INITIAL_VIEWPORTS },
})

configure(require.context('../src', true, /(.*\.)?stories\.(md|ts)x$/), module)
