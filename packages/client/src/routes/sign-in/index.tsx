import React from 'react'
import { Mutation } from 'react-apollo'
import { RouteComponentProps, navigate } from '@reach/router'
import SignIn, { Data, Variables } from './sign-in'
import { signInMutation, signInQuery } from './graphql'
import { renderLoadingIf } from 'utilities/loading'

const SignInContainer: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<Data, Variables>
      mutation={signInMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else {
          navigate('/')
        }
      }}
      update={(cache, { data = { response: { user: null } } }) =>
        cache.writeQuery({ data: data.response, query: signInQuery })
      }
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <SignIn
            {...rest}
            notice={notice}
            onSubmit={onSubmit}
            status={status}
          />
        ))
      }
    </Mutation>
  )
}

export default SignInContainer
