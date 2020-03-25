import { MockedProvider } from '@apollo/react-testing'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { createInMemoryCache } from 'utils/apollo'
import { renderWithContext } from 'utils/spec'
import Layout from '.'

test('clicking the logo should navigate to the home route', async () => {
  const { history } = renderWithContext(
    <MockedProvider cache={createInMemoryCache()}>
      <Layout>child</Layout>
    </MockedProvider>,
    { initialPath: '/not-found' }
  )
  const logoElement = await waitFor(() => screen.getByAltText('Logo'))

  expect(logoElement).toBeInTheDocument()
  expect(history.location.pathname).toStrictEqual('/not-found')

  userEvent.click(logoElement)

  expect(history.location.pathname).toStrictEqual('/')
})
