import { useQuery } from '@apollo/react-hooks'
import loadable from '@loadable/component'
import { Router } from '@reach/router'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'
import { renderLoadingIf } from 'utils/loading'
import { CurrentUserQueryData, currentUserQuery } from './graphql'

const Home = loadable(() =>
  import(/* webpackChunkName: 'home' */ 'routes/home')
)

const NotFound = loadable(() =>
  import(/* webpackChunkName: 'not-found' */ 'routes/not-found')
)

const Recover = loadable(() =>
  import(/* webpackChunkName: 'recover' */ 'routes/recover')
)

const Register = loadable(() =>
  import(/* webpackChunkName: 'register' */ 'routes/register')
)

const Settings = loadable(() =>
  import(/* webpackChunkName: 'settings' */ 'routes/settings')
)

const SignIn = loadable(() =>
  import(/* webpackChunkName: 'sign-in' */ 'routes/sign-in')
)

const Root: React.FunctionComponent = () => {
  const Fault = __IS_DEV__ ? require('routes/fault').default : undefined

  const { data = {}, loading: isQueryingCurrentUser } = useQuery<
    CurrentUserQueryData
  >(currentUserQuery, { fetchPolicy: 'network-only', ssr: false })

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          {renderLoadingIf(isQueryingCurrentUser, () =>
            data.user ? (
              <Router>
                {Fault && <Fault path="/error" />}
                <Home path="/" />
                <Recover path="/recover" />
                <Settings path="/settings" />
                <NotFound default />
              </Router>
            ) : (
              <Router>
                {Fault && <Fault path="/error" />}
                <Home path="/" />
                <Recover path="/recover" />
                <Register path="/register" />
                <SignIn path="/sign-in" />
                <NotFound default />
              </Router>
            )
          )}
        </React.Fragment>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default Root
