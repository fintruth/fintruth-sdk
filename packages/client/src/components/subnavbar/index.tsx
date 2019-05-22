import { Link as BaseLink } from '@reach/router'
import { darken, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Item {
  id: string
  content: React.ReactNode
  to: string
}

interface Props {
  items: Item[]
  onItemClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const Root = styled.nav`
  display: flex;
`

const Link = styled(BaseLink)`
  border-bottom-color: ${({ theme }) => theme.grayLighter};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: ${({ theme }) => theme.grayLight};
  flex-grow: 1;
  font-size: ${rem(12)};
  font-weight: 700;
  padding: ${rem(12)} ${rem(20)};
  text-align: center;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => darken(0.025, theme.grayLight)};
  }

  &:active {
    color: ${({ theme }) => darken(0.05, theme.grayLight)};
  }

  &[data-is-current='true'] {
    border-bottom-color: ${({ theme }) => theme.primary};
    border-bottom-width: 2px;
    color: ${({ theme }) => theme.primary};
    padding-bottom: ${rem(11)};
  }
`

const Subnavbar: React.FunctionComponent<Props> = ({
  items,
  onItemClick,
  ...props
}: Props) => (
  <Root aria-label="navigation" role="navigation" {...props}>
    {items.map(({ content, id, to }) => (
      <Link
        id={id}
        getProps={({ isCurrent }) => ({ 'data-is-current': isCurrent })}
        key={id}
        onClick={onItemClick}
        to={to}
      >
        {content}
      </Link>
    ))}
  </Root>
)

export default Subnavbar
