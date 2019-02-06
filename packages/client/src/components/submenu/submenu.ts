import styled, { css } from 'styled-components'
import { MenuButton, MenuList } from '@reach/menu-button'
import { darken, rem, transparentize } from 'polished'
import { azure, black, lilia, raven, white } from 'styles/variables'
import { fill, medium } from 'styles/mixins'

export {
  Menu as Submenu,
  MenuItem as SubmenuItem,
  MenuLink as SubmenuLink,
} from '@reach/menu-button'

export const SubmenuButton = styled(MenuButton)`
  background-color: unset;
  border: unset;
  color: ${raven};
  cursor: pointer;
  display: block;
  font-size: ${rem(14)};
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

export const SubmenuDivider = styled.div`
  ${fill};
  border-bottom: ${rem(1)} solid ${lilia};
  margin: 0 ${rem(3)};
`

export const SubmenuList = styled(MenuList)`
  background-color: ${white};
  border-radius: ${rem(2)};
  border: ${rem(1)} solid ${white};
  box-shadow: 0 ${rem(2)} ${rem(5)} 0 ${transparentize(0.74, black)};
  font-family: 'Raleway', sans-serif;
  padding: ${rem(7)} 0;

  [data-reach-menu-item][data-selected] {
    background-color: ${azure};

    &:active {
      background-color: ${darken(0.1, azure)};
    }
  }
`
