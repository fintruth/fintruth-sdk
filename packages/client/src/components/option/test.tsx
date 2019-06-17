import { render } from '@testing-library/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import Option from '.'

test('should render correctly', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Option />
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
