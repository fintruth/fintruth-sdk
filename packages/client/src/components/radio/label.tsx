import { em } from 'polished'
import React from 'react'
import styled, { css } from 'styled-components'

import { useRadioContext } from '.'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  children: React.ReactNode
}

interface RootProps {
  isDisabled: boolean
}

const disabled = css`
  color: ${({ theme }) => theme.textLightColor} !important;
  cursor: not-allowed;
`

const Root = styled.label<RootProps>`
  cursor: pointer;
  margin-left: ${em(4)};

  ${({ isDisabled }) => isDisabled && disabled}

  &:hover,
  input:hover ~ & {
    color: ${({ theme }) => theme.grayDarker};
  }

  fieldset[disabled] & {
    ${disabled};
  }
`

const Label: React.RefForwardingComponent<HTMLLabelElement, Props> = (
  props: Props,
  ref: React.Ref<HTMLLabelElement>
) => {
  const { inputId, isDisabled } = useRadioContext()[0]

  return (
    <Root
      data-radio-label
      htmlFor={inputId}
      isDisabled={isDisabled}
      ref={ref}
      {...props}
    />
  )
}

export default React.forwardRef(Label)
