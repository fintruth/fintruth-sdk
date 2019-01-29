import React from 'react'
import { fireEvent } from 'react-testing-library'
import { renderWithRouter } from 'utilities/specification'
import Layout from '.'

test('clicking the logo should navigate to the home route', () => {
  const { getByAltText, history } = renderWithRouter(<Layout>child</Layout>, {
    initialPath: '/not-found',
  })
  const logoElement = getByAltText('Logo')

  expect(logoElement).toBeInTheDocument()
  expect(history.location.pathname).toStrictEqual('/not-found')

  fireEvent.click(logoElement)

  expect(history.location.pathname).toStrictEqual('/')
})
