import { MenuButton, MenuList } from '@reach/menu-button'
import { darken, rem, transparentize } from 'polished'
import styled, { css } from 'styled-components'

import { medium } from 'styles/mixins'

export {
  Menu as Submenu,
  MenuItem as SubmenuItem,
  MenuLink as SubmenuLink,
} from '@reach/menu-button'

export const SubmenuButton = styled(MenuButton)`
  background-color: unset;
  border: unset;
  color: ${({ theme }) => theme.grayDarker};
  cursor: pointer;
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

export const SubmenuDivider = styled.div`
  border-bottom: ${rem(1)} solid ${({ theme }) => theme.whiteTer};
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 ${rem(3)};
`

export const SubmenuList = styled(MenuList)`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${rem(2)};
  border: ${rem(1)} solid ${({ theme }) => theme.white};
  box-shadow: 0 ${rem(2)} ${rem(5)} 0
    ${({ theme }) => transparentize(0.74, theme.black)};
  font-family: 'Raleway', sans-serif;
  padding: ${rem(7)} 0;

  [data-reach-menu-item][data-selected] {
    background-color: ${({ theme }) => theme.blue};

    &:active {
      background-color: ${({ theme }) => darken(0.1, theme.blue)};
    }
  }
`
