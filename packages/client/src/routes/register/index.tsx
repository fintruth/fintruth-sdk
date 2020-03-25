import { RouteComponentProps, navigate } from '@reach/router'
import { rem } from 'polished'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import BaseTabs, { Tab, TabList } from 'components/tabs'
import { navigation } from 'i18n'
import RegisterForm from './register-form'

type Props = RouteComponentProps

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Tabs = styled(BaseTabs)`
  margin-bottom: ${rem(50)};
`

const Register: React.FunctionComponent<Props> = (props: Props) => (
  <Root data-testid="register" {...props}>
    <Content>
      <Tabs
        defaultIndex={1}
        onChange={(index) => navigate(index === 0 ? '/sign-in' : '/register')}
      >
        <TabList>
          <Tab>
            <FormattedMessage {...navigation.route.signIn} />
          </Tab>
          <Tab>
            <FormattedMessage {...navigation.route.register} />
          </Tab>
        </TabList>
      </Tabs>
      <RegisterForm />
    </Content>
  </Root>
)

export default Register
