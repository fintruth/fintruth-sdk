import React from 'react'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import Register, { Data, Variables } from './register'
import { registerMutation } from './graphql'
import { renderLoadingIf } from 'utilities/loading'

const RegisterContainer: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [status, setStatus] = React.useState('success')

  return (
    <Mutation<Data, Variables>
      mutation={registerMutation}
      onCompleted={({ response }) => {
        if (response.error) {
          setNotice(response.error.message)
          setStatus('failure')
        } else {
          setNotice('A verification email has been sent')
          setStatus('success')
        }
      }}
    >
      {(onSubmit, { loading }) =>
        renderLoadingIf(loading, () => (
          <Register
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

export default RegisterContainer
