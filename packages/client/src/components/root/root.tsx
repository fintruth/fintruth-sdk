import React from 'react'
import loadable from '@loadable/component'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { NormalizedCacheObject } from 'apollo-cache-inmemory' // eslint-disable-line import/named
import { Router } from '@reach/router'
import GlobalStyle from 'styles/global'

interface Props {
  client: ApolloClient<NormalizedCacheObject>
}

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

const Root: React.FunctionComponent<Props> = ({ client, ...rest }: Props) => {
  const Fault = __DEV__ ? require('routes/fault').default : null

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Router>
        {Fault && <Fault {...rest} path="/error" />}
        <Home {...rest} path="/" />
        <Recover {...rest} path="/recover" />
        <Register {...rest} path="/register" />
        <SignIn {...rest} path="/sign-in" />
        <NotFound {...rest} default />
      </Router>
    </ApolloProvider>
  )
}

export default Root
