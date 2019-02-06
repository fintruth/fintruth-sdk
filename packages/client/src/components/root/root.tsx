import React from 'react'
import loadable from '@loadable/component'
import { Router } from '@reach/router'

import GlobalStyle from 'styles/global'

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

const SignIn = loadable(() =>
  import(/* webpackChunkName: 'sign-in' */ 'routes/sign-in')
)

const Root: React.FunctionComponent = ({ ...rest }) => {
  const Fault = __DEV__ ? require('routes/fault').default : null

  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        {Fault && <Fault {...rest} path="/error" />}
        <Home {...rest} path="/" />
        <Recover {...rest} path="/recover" />
        <Register {...rest} path="/register" />
        <SignIn {...rest} path="/sign-in" />
        <NotFound {...rest} default />
      </Router>
    </React.Fragment>
  )
}

export default Root
