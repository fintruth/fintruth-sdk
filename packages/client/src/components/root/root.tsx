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

const Root: React.FunctionComponent<Props> = ({ client }: Props) => {
  const Fault = __DEV__ ? require('routes/fault').default : undefined

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Router>
        {Fault && <Fault path="/error" />}
        <Home data-testid="home" path="/" />
        <NotFound data-testid="not-found" default />
      </Router>
    </ApolloProvider>
  )
}

export default Root
