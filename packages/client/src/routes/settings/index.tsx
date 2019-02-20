import React from 'react'
import styled, { css } from 'styled-components'
import { Query } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'

import Layout from 'components/layout'
import { card, content, fill, untilMedium } from 'styles/mixins'
import { renderLoadingIf } from 'utilities/loading'
import UpdateEmailForm from './update-email-form'
import UpdatePasswordForm from './update-password-form'
import UpdateProfileForm from './update-profile-form'
import { AccountQueryData, accountQuery } from './graphql'

const Root = styled.div`
  ${content};
  ${fill}
  flex-direction: column;
  padding: ${rem(40)} 0;

  ${untilMedium(css`
    padding: ${rem(40)} ${rem(20)};
  `)};
`

const Card = styled.div`
  ${card};
`

const Header = styled.h2`
  font-size: ${rem(18)};
  font-weight: 700;
  margin: ${rem(20)} 0 ${rem(20)} 0;

  &:first-child {
    margin-top: unset;
  }
`

const Settings: React.FunctionComponent<RouteComponentProps> = ({
  ...rest
}: RouteComponentProps) => (
  <Layout {...rest}>
    <Root>
      <Query<AccountQueryData> query={accountQuery}>
        {({ data = {}, loading, refetch }) =>
          renderLoadingIf(loading, () => (
            <Card>
              <Header>EMAIL</Header>
              <UpdateEmailForm refetchAccountQuery={refetch} user={data.user} />
              <Header>PASSWORD</Header>
              <UpdatePasswordForm refetchAccountQuery={refetch} />
              <Header>PROFILE INFORMATION</Header>
              <UpdateProfileForm user={data.user} />
            </Card>
          ))
        }
      </Query>
    </Root>
  </Layout>
)

export default Settings
