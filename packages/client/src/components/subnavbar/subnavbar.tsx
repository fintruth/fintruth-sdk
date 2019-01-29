import React from 'react'
import styled from 'styled-components'
import { Link as BaseLink } from '@reach/router'
import { darken, rem } from 'polished'
import { azure, heather, lilia } from 'styles/variables'

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
  border-bottom-color: ${lilia};
  border-bottom-style: solid;
  border-bottom-width: ${rem(1)};
  color: ${heather};
  flex-grow: 1;
  font-size: ${rem(12)};
  font-weight: 700;
  padding: ${rem(12)} ${rem(20)};
  text-align: center;
  white-space: nowrap;

  &:hover {
    color: ${darken(0.05, heather)};
  }

  &:active {
    color: ${darken(0.1, heather)};
  }

  &[data-is-current='true'] {
    border-bottom-color: ${azure};
    border-bottom-width: ${rem(2)};
    color: ${azure};
    padding-bottom: ${rem(11)};
  }
`

const Subnavbar: React.FunctionComponent<Props> = ({
  items,
  onItemClick,
  ...rest
}: Props) => (
  <Root aria-label="navigation" role="navigation" {...rest}>
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
