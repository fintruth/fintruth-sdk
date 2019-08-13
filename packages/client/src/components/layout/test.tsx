import { MockedProvider } from '@apollo/react-testing'
import { waitForElement } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/theme'
import { createFragmentMatcher, createInMemoryCache } from 'utils/apollo'
import { renderWithRouter } from 'utils/specification'
import Layout from '.'

const fragmentMatcher = createFragmentMatcher()

test('clicking the logo should navigate to the home route', async () => {
  const { getByAltText, history } = renderWithRouter(
    <MockedProvider cache={createInMemoryCache({ fragmentMatcher })}>
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
