import React from 'react'
import styled, { css } from 'styled-components'
import { Link as BaseLink } from '@reach/router'
import { darken, rem } from 'polished'
import logoUrl from 'assets/logo.png'
import { content, medium, untilMedium } from 'styles/mixins'
import { raven } from 'styles/variables'

interface Props {
  children: React.ReactNode
}

interface State {
  isTogglerActive: boolean
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Navbar = styled.nav`
  ${content};
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

  ${untilMedium(css`
    align-items: center;
    display: flex;
  `)};
`

const Logo = styled.img`
  height: ${rem(28)};
`

const Toggler = styled.button`
  border: unset;
  cursor: pointer;
  display: block;
  height: ${rem(52)};
  margin-left: auto;
  position: relative;
  width: ${rem(52)};

  ${medium(css`
    display: none;
  `)};
`

const Icon = styled.span`
  background-color: ${raven};
  height: ${rem(1)};
  left: calc(50% - ${rem(8)});
  position: absolute;
  transform-origin: center;
  transition: opacity, transform 150ms ease-out;
  width: ${rem(16)};

  ${({ isTogglerActive }: State) =>
    isTogglerActive &&
    css`
      &:nth-child(1) {
        transform: translateY(${rem(6)}) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(${rem(-6)}) rotate(-45deg);
      }
    `}

  &:nth-child(1) {
    top: calc(50% - ${rem(7)});
  }

  &:nth-child(2) {
    top: calc(50% - ${rem(1)});
  }

  &:nth-child(3) {
    top: calc(50% + ${rem(5)});
  }

  ${/* sc-selector */ Toggler}:hover > & {
    background-color: ${darken(0.05, raven)};
  }

  ${/* sc-selector */ Toggler}:active > & {
    background-color: ${darken(0.1, raven)};
  }
`

const Menu = styled.div`
  display: none;

  ${({ isTogglerActive }: State) =>
    untilMedium(
      isTogglerActive
        ? css`
            display: block;
          `
        : css`
            padding: ${rem(8)} 0;
          `
    )};

  ${medium(css`
    display: flex;
    margin: 0 ${rem(-12)} 0 auto;
  `)};
`

const ItemLink = styled(BaseLink)`
  color: ${raven};
  display: block;
  padding: ${rem(8)} ${rem(12)};

  ${medium(css`
    align-items: center;
    display: flex;
  `)};

  &:hover {
    color: ${darken(0.05, raven)};
  }

  &:active {
    color: ${darken(0.1, raven)};
  }
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  ...rest
}: Props) => {
  const [isTogglerActive, setTogglerActive] = React.useState(false)

  return (
    <Root {...rest}>
      <header>
        <Navbar aria-label="main navigation">
          <Brand>
            <LogoLink aria-label="home" to="/">
              <Logo alt="Logo" src={logoUrl} />
            </LogoLink>
            <Toggler
              aria-expanded={isTogglerActive}
              aria-label="menu"
              onClick={() => setTogglerActive(!isTogglerActive)}
              type="button"
            >
              <Icon isTogglerActive={isTogglerActive} aria-hidden="true" />
              <Icon isTogglerActive={isTogglerActive} aria-hidden="true" />
              <Icon isTogglerActive={isTogglerActive} aria-hidden="true" />
            </Toggler>
          </Brand>
          <Menu isTogglerActive={isTogglerActive}>
            <ItemLink to="/sign-in">Sign In</ItemLink>
          </Menu>
        </Navbar>
      </header>
      {children}
    </Root>
  )
}

export default Layout
