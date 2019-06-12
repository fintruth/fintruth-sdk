import { em, rem } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import { loader } from 'styles/mixins'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  children: React.ReactNode
  isLoading?: boolean
}

interface RootProps {
  isLoading?: boolean
}

const loading = css`
  &::after {
    ${loader()};
    position: absolute !important;
    right: ${em(10)};
    top: ${em(10)};
    z-index: 4;
  }
`

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  clear: both;
  font-size: ${rem(16)};
  position: relative;
  text-align: left;

  ${({ isLoading }) => isLoading && loading};
`

const Control: React.RefForwardingComponent<HTMLDivElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLDivElement>
) => <Root ref={ref} {...props} />

export default React.forwardRef(Control)
