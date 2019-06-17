import { em } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends React.OptionHTMLAttributes<HTMLOptionElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
}

const Root = styled.option`
  select[multiple] & {
    padding: ${em(8)} ${em(16)};
  }

  select[disabled][multiple] &,
  fieldset[disabled] select[multiple] & {
    color: ${({ theme }) => theme.textLightColor};
  }
`

const Option: React.RefForwardingComponent<HTMLOptionElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLOptionElement>
) => <Root ref={ref} {...props} />

export default React.forwardRef(Option)
