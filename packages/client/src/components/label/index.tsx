import { em, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  children: React.ReactNode
  isRequired?: boolean
}

const Root = styled.label`
  color: ${({ theme }) => theme.grayDarker};
  display: block;
  font-size: ${rem(16)};
  font-weight: 700;

  &:not(:last-child) {
    margin-bottom: ${em(8)};
  }
`

const Label = (
  { children, isRequired, ...props }: Props,
  ref: React.Ref<HTMLLabelElement>
) => (
  <Root ref={ref} {...props}>
    {children}
    {isRequired && '*'}
  </Root>
)

export default React.forwardRef(Label)
