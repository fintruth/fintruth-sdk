import { RouteComponentProps } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { Query } from 'react-apollo'
import styled, { css } from 'styled-components'

import Layout from 'components/layout'
import { card, fill, steel } from 'styles/deprecated'
import { container, untilMedium } from 'styles/mixins'
import { renderLoadingIf } from 'utilities/loading'
import AuthenticatorAppButton from './authenticator-app-button'
import { AccountQueryData, accountQuery } from './graphql'
import UpdateEmailForm from './update-email-form'
import UpdatePasswordForm from './update-password-form'
import UpdateProfileForm from './update-profile-form'

const Root = styled.div`
  ${container()};
  ${fill}
  flex-direction: column;
  padding: ${rem(40)} 0;

  ${untilMedium(css`
    padding: ${rem(40)} ${rem(20)};
  `)};
`

const Card = styled.div`
  ${card};

  & + & {
    margin-top: ${rem(20)};
  }
`

const Header = styled.h2`
  font-size: ${rem(18)};
  font-weight: 700;
  margin: 0 0 ${rem(20)} 0;
`

const Subheader = styled.h3`
  color: ${steel};
  font-size: ${rem(16)};
  font-weight: 700;
  margin: ${rem(20)} 0 ${rem(20)} 0;

  &:first-child {
    margin-top: unset;
  }
`

const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${rem(20)};
`

const Label = styled.div`
  color: ${steel};
  font-size: ${rem(14)};
  font-weight: 700;
  padding: ${rem(8)} 0 ${rem(9)};
`

const Method = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: ${rem(15)};
`

const defaultProfile = {
  userId: '',
  firstName: '',
  lastName: '',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const defaultUser = {
  id: '',
  email: '',
  isAdmin: false,
  isTwoFactorAuthEnabled: false,
  profile: defaultProfile,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const Settings: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => (
  <Layout data-testid="settings" {...props}>
    <Query<AccountQueryData> query={accountQuery}>
      {({ data = {}, loading }) => {
        const user = data.user || defaultUser

        return renderLoadingIf(loading, () => (
          <Root>
            <Card>
              <Subheader>EMAIL</Subheader>
              <UpdateEmailForm user={user} />
              <Subheader>PASSWORD</Subheader>
              <UpdatePasswordForm />
              <Subheader>PROFILE INFORMATION</Subheader>
              <UpdateProfileForm user={user} />
            </Card>
            <Card>
              <Header>Two-Factor Authentication</Header>
              Two-factor authentication adds an additional layer of security to
              your account by requiring more than just a password to sign in.
              <MethodContainer>
                <Label>Methods</Label>
                <Method>
                  Authenticator App
                  <div>
                    {!user.isTwoFactorAuthEnabled && 'Not'} Configured
                    <AuthenticatorAppButton user={user} />
                  </div>
                </Method>
              </MethodContainer>
            </Card>
          </Root>
        ))
      }}
    </Query>
  </Layout>
)

export default Settings
