import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from '@reach/router'
import React from 'react'
import styled from 'styled-components'

import { renderLoadingIf } from 'utilities/loading'
import { CurrentUserQueryData, currentUserQuery } from './graphql'
import RecoverForm from './recover-form'

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

const Recover: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => {
  const { data = {}, loading: isQueryingCurrentUser } = useQuery<
    CurrentUserQueryData
  >(currentUserQuery)

  return (
    <Root data-testid="recover" {...props}>
      {renderLoadingIf(isQueryingCurrentUser, () => (
        <RecoverForm user={data.user} />
      ))}
    </Root>
  )
}

export default Recover
