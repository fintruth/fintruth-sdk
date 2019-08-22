import { useMutation, useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from '@reach/router'
import { darken, rem } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import BaseButton from 'components/button'
import Layout from 'components/layout'
import { container, untilMedium } from 'styles/mixins'
import { renderLoadingIf } from 'utils/loading'
import DisableTwoFactorAuthDialog from './disable-two-factor-auth-dialog'
import EnableTwoFactorAuthDialog from './enable-two-factor-auth-dialog'
import {
  CurrentUserQueryData,
  EnableTwoFactorAuthMutationData,
  currentUserQuery,
  enableTwoFactorAuthMutation,
} from './graphql'
import UpdatePasswordForm from './update-password-form'
import UpdateProfileForm from './update-profile-form'

type Props = RouteComponentProps

const Root = styled.div`
  ${container()};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  padding: ${rem(40)} 0;

  ${untilMedium(css`
    padding: ${rem(40)} ${rem(20)};
  `)};
`

const Card = styled.div`
  background-color: ${({ theme }) => darken(0.026, theme.white)};
  padding: ${rem(40)};

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
  color: ${({ theme }) => theme.gray};
  font-size: ${rem(16)};
  font-weight: 700;
  margin: ${rem(20)} 0 ${rem(20)} 0;

  &:first-child {
    margin-top: unset;
  }
`

const Methods = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${rem(20)};
`

const Label = styled.div`
  color: ${({ theme }) => theme.gray};
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

const Button = styled(BaseButton)`
  display: inline-flex;
  margin-left: ${rem(20)};
`

const defaultProfile = {
  id: '',
  familyName: '',
  givenName: '',
  userId: '',
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
}

const Settings: React.FunctionComponent<Props> = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const [onEnable, { data, loading: isEnabling }] = useMutation<
    EnableTwoFactorAuthMutationData
  >(enableTwoFactorAuthMutation, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ response }) =>
      response.error ? undefined : setIsDialogOpen(true),
  })

  const {
    data: {
      user: { isTwoFactorAuthEnabled = false, profile = defaultProfile } = {},
    } = {},
    loading: isQueryingCurrentUser,
  } = useQuery<CurrentUserQueryData>(currentUserQuery)

  const handleDismiss = React.useCallback(() => setIsDialogOpen(false), [])

  return (
    <Layout data-testid="settings" {...props}>
      {renderLoadingIf(isQueryingCurrentUser, () => (
        <Root>
          <Card>
            <Subheader>Password</Subheader>
            <UpdatePasswordForm />
            <Subheader>Profile Information</Subheader>
            <UpdateProfileForm data={profile} />
          </Card>
          <Card>
            <Header>Two-Factor Authentication</Header>
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to sign in.
            <Methods>
              <Label>Methods</Label>
              <Method>
                Authenticator App
                <div>
                  {!isTwoFactorAuthEnabled && 'Not'} Configured
                  <Button
                    isLoading={isEnabling}
                    isOutlined
                    onClick={() =>
                      isTwoFactorAuthEnabled
                        ? setIsDialogOpen(true)
                        : onEnable()
                    }
                    type="button"
                    variant={data && data.response.error && 'danger'}
                  >
                    Edit
                  </Button>
                  {isTwoFactorAuthEnabled ? (
                    <DisableTwoFactorAuthDialog
                      isOpen={isDialogOpen}
                      onDismiss={handleDismiss}
                    />
                  ) : (
                    <EnableTwoFactorAuthDialog
                      dataUrl={data && data.response.dataUrl}
                      isOpen={isDialogOpen}
                      onDismiss={handleDismiss}
                      secret={data && data.response.secret}
                    />
                  )}
                </div>
              </Method>
            </Methods>
          </Card>
        </Root>
      ))}
    </Layout>
  )
}

export default Settings
