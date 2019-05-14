import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { waitForElement } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'
import userEvent from 'user-event'

import theme from 'styles/theme'
import { renderWithRouter } from 'utilities/specification'
import Layout from '.'

test('clicking the logo should navigate to the home route', async () => {
  const { getByAltText, history } = renderWithRouter(
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <Layout>child</Layout>
      </ThemeProvider>
    </MockedProvider>,
    { initialPath: '/not-found' }
  )
  const logoElement = await waitForElement(() => getByAltText('Logo'))

  expect(logoElement).toBeInTheDocument()
  expect(history.location.pathname).toStrictEqual('/not-found')

  userEvent.click(logoElement)

  expect(history.location.pathname).toStrictEqual('/')
})
