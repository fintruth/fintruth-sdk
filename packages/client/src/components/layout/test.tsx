import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { fireEvent, waitForElement } from 'react-testing-library'

import { renderWithRouter } from 'utilities/specification'
import Layout from '.'

test('clicking the logo should navigate to the home route', async () => {
  const { getByAltText, history } = renderWithRouter(
    <MockedProvider>
      <Layout>child</Layout>
    </MockedProvider>,
    { initialPath: '/not-found' }
  )
  const logoElement = await waitForElement(() => getByAltText('Logo'))

  expect(logoElement).toBeInTheDocument()
  expect(history.location.pathname).toStrictEqual('/not-found')

  fireEvent.click(logoElement)

  expect(history.location.pathname).toStrictEqual('/')
})
