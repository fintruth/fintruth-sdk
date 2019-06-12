import { Omit } from '@fintruth-sdk/common'
import { em, transparentize } from 'polished'
import React from 'react'
import styled, { DefaultTheme, Color, css } from 'styled-components' // eslint-disable-line import/named

import { control } from 'styles/mixins'

export type Type = 'email' | 'password' | 'tel' | 'text'
export type Variant = 'danger'

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required'
  > {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  isDisabled?: boolean
  isRequired?: boolean
  type?: Type
  variant?: Variant
}

interface RootProps {
  variant?: Variant
}

const colors: Record<Variant, Color> = {
  danger: 'danger',
}

const focusBoxShadowSize = `0 0 0 ${em(2)}`

const standard = (theme: DefaultTheme) => css`
  border-color: ${theme.grayLighter};

  &:hover {
    border-color: ${({ theme }) => theme.grayLight};
  }

  &:focus,
  &:active {
    border-color: ${({ theme }) => theme.linkColor};
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, theme.linkColor)};
  }
`

const variation = (color: string) => css`
  border-color: ${color};

  &:focus,
  &:active {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
  }
`

const Root = styled.input<RootProps>`
  ${control};
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: inset 0 1px 2px ${({ theme }) => transparentize(0.9, theme.black)};
  color: ${({ theme }) => theme.grayDarker};
  display: block;
  max-width: 100%;
  width: 100%;

  ${({ theme, variant }) =>
    variant ? variation(theme[colors[variant]]) : standard(theme)};

  &::placeholder {
    color: ${({ theme }) => transparentize(0.7, theme.grayDarker)};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: none;
    color: ${({ theme }) => theme.textLightColor};

    &::placeholder {
      color: ${({ theme }) => transparentize(0.7, theme.textLightColor)};
    }
  }
`

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  {
    autoComplete = 'off',
    isDisabled,
    isRequired,
    type = 'text',
    ...props
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => (
  <Root
    autoComplete={autoComplete}
    disabled={isDisabled}
    ref={ref}
    required={isRequired}
    type={type}
    {...props}
  />
)

export default React.forwardRef(Input)
