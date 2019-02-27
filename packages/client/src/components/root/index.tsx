import React from 'react'
import loadable from '@loadable/component'
import { Query } from 'react-apollo'
import { Router } from '@reach/router'

import GlobalStyle from 'styles/global'
import { RootQueryData, rootQuery } from './graphql'
import { renderLoadingIf } from 'utilities/loading'

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
  const Fault = __DEV__ ? require('routes/fault').default : null

  return (
    <React.Fragment>
      <GlobalStyle />
      <Query<RootQueryData>
        fetchPolicy="network-only"
        query={rootQuery}
        ssr={false}
      >
        {({ data = {}, loading }) =>
          renderLoadingIf(loading, () => (
            <Router>
              {Fault && <Fault path="/error" />}
              <Home path="/" />
              <Recover path="/recover" />
              {data.user && <Settings path="/settings" />}
              {!data.user && <Register path="/register" />}
              {!data.user && <SignIn path="/sign-in" />}
              <NotFound default />
            </Router>
          ))
        }
      </Query>
    </React.Fragment>
  )
}

export default Root
