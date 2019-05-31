import { Omit } from '@fintruth-sdk/shared'
import { useField } from 'formik'
import { em, rem, transparentize } from 'polished'
import React from 'react'
import styled, { Color, DefaultTheme, css } from 'styled-components' // eslint-disable-line import/named

import BaseLabel from 'components/label'
import { control, help, loader } from 'styles/mixins'

export type Type = 'email' | 'password' | 'tel' | 'text'
type Variant = 'danger'

interface ControlProps {
  isLoading?: boolean
}

interface InputProps {
  variant?: Variant
}

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required'
  > {
  id: string
  isDisabled?: boolean
  isLoading?: boolean
  isRequired?: boolean
  label?: string
  name: string
  type?: Type
}

const colors: Record<Variant, Color> = {
  danger: 'danger',
}

const focusBoxShadowSize = `0 0 0 ${em(2)}`

const loading = css`
  &::after {
    ${loader()};
    position: absolute !important;
    right: ${em(10)};
    top: ${em(10)};
    z-index: 4;
  }
`

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

const Root = styled.div`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const Label = styled(BaseLabel)`
  font-size: inherit;
  margin-bottom: ${rem(8)};
`

const Control = styled.div<ControlProps>`
  box-sizing: border-box;
  clear: both;
  font-size: ${rem(16)};
  position: relative;
  text-align: left;

  ${({ isLoading }) => isLoading && loading};
`

const BaseInput = styled.input<InputProps>`
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

const Help = styled.p`
  ${({ theme }) => help(theme.danger)};
`

const Input: React.RefForwardingComponent<HTMLInputElement, Props> = (
  {
    className,
    id,
    isDisabled,
    isLoading,
    isRequired = true,
    label,
    name,
    type = 'text',
    ...props
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const [field, { error, touched }] = useField<string>(name)

  return (
    <Root className={className}>
      {label && (
        <Label htmlFor={id} isRequired={isRequired}>
          {label}
        </Label>
      )}
      <Control isLoading={isLoading}>
        <BaseInput
          {...field}
          id={id}
          type={type}
          variant={error && touched ? 'danger' : undefined}
          {...props}
          ref={ref}
          disabled={isDisabled}
        />
      </Control>
      {error && touched && <Help>{error}</Help>}
    </Root>
  )
}

export default React.forwardRef(Input)
