import React from 'react'
import styled, { css } from 'styled-components'
import { Link as BaseLink } from '@reach/router'
import { rem } from 'polished'
import { contentContainer, medium, untilMedium } from 'styles/mixins'

interface Props {
  children: React.ReactNode
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Navbar = styled.nav`
  ${contentContainer};
  display: flex;
  min-height: ${rem(52)};
  width: 100%;

  ${untilMedium(css`
    display: block;
  `)};
`

const Brand = styled.div`
  display: flex;
  min-height: ${rem(52)};

  ${medium(css`
    margin-left: ${rem(-12)};
  `)};
`

const LogoLink = styled(BaseLink)`
  align-items: center;
  display: flex;
  padding: ${rem(8)} ${rem(12)};
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  ...rest
}: Props) => (
  <Root {...rest}>
    <header>
      <Navbar aria-label="main navigation">
        <Brand>
          <LogoLink aria-label="home" data-testid="logo" to="/">
            Logo
          </LogoLink>
        </Brand>
      </Navbar>
    </header>
    {children}
  </Root>
)

export default Layout
