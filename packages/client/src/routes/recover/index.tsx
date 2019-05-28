import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from '@reach/router'
import React from 'react'
import styled from 'styled-components'

import { centered } from 'styles/deprecated'
import { renderLoadingIf } from 'utilities/loading'
import { RecoverQueryData, recoverQuery } from './graphql'
import RecoverForm from './recover-form'

const Root = styled.div`
  ${centered};
  flex-direction: column;
  min-height: 100vh;
`

const Recover: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => {
  const { data = {}, loading } = useQuery<RecoverQueryData>(recoverQuery)

  return (
    <Root data-testid="recover" {...props}>
      {renderLoadingIf(loading, () => (
        <RecoverForm user={data.user} />
      ))}
    </Root>
  )
}

export default Recover
