import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { Link as BaseLink, navigate } from '@reach/router'
import { darken, rem } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import BaseExpandMore from 'assets/expand-more.svg'
import BaseUserCircle from 'assets/user-circle.svg'
import logoUrl from 'assets/logo.png'
import {
  Submenu,
  SubmenuButton,
  SubmenuItem,
  SubmenuLink,
  SubmenuList,
} from 'components/submenu'
import { container, medium, untilMedium } from 'styles/mixins'
import { renderLoadingIf } from 'utils/loading'
import {
  CurrentUserQueryData,
  SignOutMutationData,
  currentUserQuery,
  signOutMutation,
} from './graphql'

interface MenuProps {
  isOpen: boolean
}

interface Props {
  children?: React.ReactNode
}

interface TogglerIconProps {
  isMenuOpen: boolean
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Navbar = styled.nav`
  ${container()};
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

const TogglerIcon = styled.span`
  background-color: ${({ theme }) => theme.grayDarker};
  height: ${rem(1)};
  left: calc(50% - ${rem(8)});
  position: absolute;
  transform-origin: center;
  transition: opacity, transform 150ms ease-out;
  width: ${rem(16)};

  ${({ isMenuOpen }: TogglerIconProps) =>
    isMenuOpen &&
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
    background-color: ${({ theme }) => darken(0.05, theme.grayDarker)};
  }

  ${/* sc-selector */ Toggler}:active > & {
    background-color: ${({ theme }) => darken(0.1, theme.grayDarker)};
  }
`

const Menu = styled.div`
  display: none;

  ${({ isOpen }: MenuProps) =>
    untilMedium(
      isOpen
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

const ExpandMore = styled(BaseExpandMore)`
  fill: ${({ theme }) => theme.grayDarker};
  height: ${rem(5)};
  margin: 0 ${rem(12)} 0 ${rem(6)};
`

const UserCircle = styled(BaseUserCircle)`
  fill: ${({ theme }) => theme.grayDarker};
  height: ${rem(40)};
`

const MenuLink = styled(BaseLink)`
  color: ${({ theme }) => theme.grayDarker};
  display: block;
  font-size: ${rem(14)};
  padding: ${rem(8)} ${rem(12)};

  ${medium(css`
    align-items: center;
    display: flex;
  `)};

  &:hover {
    color: ${({ theme }) => darken(0.05, theme.grayDarker)};
  }

  &:active {
    color: ${({ theme }) => darken(0.1, theme.grayDarker)};
  }
`

const Layout: React.FunctionComponent<Props> = ({
  children,
  ...props
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const client = useApolloClient()

  const [onSignOut] = useMutation<SignOutMutationData>(signOutMutation, {
    onCompleted: () =>
      client
        .resetStore()
        .then(() =>
          window.location.pathname !== '/'
            ? navigate('/', { replace: true })
            : undefined
        )
        .catch(error => __IS_DEV__ && console.error(error)),
  })

  const { data = {}, loading: isQueryingCurrentUser } = useQuery<
    CurrentUserQueryData
  >(currentUserQuery)

  return (
    <Root {...props}>
      {renderLoadingIf(isQueryingCurrentUser, () => (
        <React.Fragment>
          <header>
            <Navbar aria-label="main navigation">
              <Brand>
                <LogoLink aria-label="home" to="/">
                  <Logo alt="Logo" src={logoUrl} />
                </LogoLink>
                <Toggler
                  aria-expanded={isMenuOpen}
                  aria-label="menu"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  type="button"
                >
                  <TogglerIcon isMenuOpen={isMenuOpen} aria-hidden="true" />
                  <TogglerIcon isMenuOpen={isMenuOpen} aria-hidden="true" />
                  <TogglerIcon isMenuOpen={isMenuOpen} aria-hidden="true" />
                </Toggler>
              </Brand>
              <Menu isOpen={isMenuOpen}>
                {data.user ? (
                  <Submenu>
                    <SubmenuButton>
                      {data.user.profile.givenName}{' '}
                      {data.user.profile.familyName}
                      <ExpandMore aria-hidden />
                      <UserCircle aria-hidden />
                    </SubmenuButton>
                    <SubmenuList>
                      <SubmenuLink as={BaseLink} to="/settings">
                        Account Settings
                      </SubmenuLink>
                      <SubmenuItem onSelect={() => onSignOut()}>
                        Sign Out
                      </SubmenuItem>
                    </SubmenuList>
                  </Submenu>
                ) : (
                  <React.Fragment>
                    <MenuLink to="/sign-in">Sign In</MenuLink>
                    <MenuLink to="/register">Register</MenuLink>
                  </React.Fragment>
                )}
              </Menu>
            </Navbar>
          </header>
          {children}
        </React.Fragment>
      ))}
    </Root>
  )
}

export default Layout
