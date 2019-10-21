import { em, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

export interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
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

const Label = React.forwardRef<HTMLLabelElement, Props>(function Label(
  { children, isRequired, ...props }: Props,
  ref?: React.Ref<HTMLLabelElement>
) {
  return (
    <Root ref={ref} {...props}>
      {children}
      {isRequired && '*'}
    </Root>
  )
})

export default Label
