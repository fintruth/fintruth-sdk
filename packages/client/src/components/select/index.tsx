import { Omit } from '@fintruth-sdk/common'
import { darken, em, transparentize } from 'polished'
import React from 'react'
import styled, { Color, css } from 'styled-components' // eslint-disable-line import/named

import { useTimer } from 'hooks/time'
import { arrow, control, loader } from 'styles/mixins'

export type Variant = 'danger'

interface BaseSelectProps {
  variant?: Variant
}

interface Props
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'disabled' | 'multiple' | 'required'
  > {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  delay?: number
  isDisabled?: boolean
  isLoading?: boolean
  isMultiple?: boolean
  isRequired?: boolean
  variant?: Variant
}

interface RootProps {
  isDisabled?: boolean
  isLoading?: boolean
  isMultiple?: boolean
  variant?: Variant
}

const colors: Record<Variant, Color> = {
  danger: 'danger',
}

const focusBoxShadowSize = `0 0 0 ${em(2)}`

const loading = (color?: string) => css`
  &::after {
    ${loader(color)};
    position: absolute !important;
    right: ${em(10)};
    top: calc(50% - ${em(8)});
    z-index: 4;
  }
`

const single = (color?: string) => css`
  &::after {
    ${arrow(color)};
    position: absolute !important;
    right: ${em(13)};
    top: calc(50% - 2.5px);
    z-index: 4;
  }

  &:hover::after {
    border-top-color: ${({ theme }) => theme.grayDarker};
  }
`

const standard = css`
  border-color: ${({ theme }) => theme.grayLighter};

  &:hover {
    border-color: ${({ theme }) => theme.grayLight};
  }

  &:focus,
  &:active {
    border-color: ${({ theme }) => theme.linkColor};
    box-shadow: ${({ theme }) =>
      `${focusBoxShadowSize} ${transparentize(0.75, theme.linkColor)}`};
  }
`

const variation = (color: string) => css`
  border-color: ${color};

  &:hover {
    border-color: ${darken(0.025, color)};
  }

  &:focus,
  &:active {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
  }
`

const Root = styled.div<RootProps>`
  max-width: 100%;
  position: relative;
  vertical-align: top;

  ${({ isDisabled, isLoading, isMultiple, theme, variant }) => {
    if (isDisabled || isMultiple) {
      return undefined
    }

    const color = variant && theme[colors[variant]]

    return isLoading ? loading(color) : single(color)
  }};
`

const BaseSelect = styled.select<BaseSelectProps>`
  ${control};
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: inset 0 1px 2px ${({ theme }) => transparentize(0.9, theme.black)};
  color: ${({ theme }) => theme.grayDarker};
  cursor: pointer;
  display: block;
  font-size: ${em(16)};
  max-width: 100%;
  outline: none;
  padding-right: ${em(36)};
  width: 100%;

  ${({ theme, variant }) =>
    variant ? variation(theme[colors[variant]]) : standard};

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${({ theme }) => theme.grayDarker};
  }

  &::-ms-expand {
    display: none;
  }

  &[multiple] {
    height: auto;
    padding: 0;
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: none;
    color: ${({ theme }) => theme.textLightColor};
  }
`

const Select: React.RefForwardingComponent<HTMLSelectElement, Props> = (
  {
    autoComplete = 'off',
    className,
    delay,
    isDisabled,
    isLoading = false,
    isMultiple,
    isRequired,
    variant,
    ...props
  }: Props,
  ref: React.Ref<HTMLSelectElement>
) => {
  const isExpired = useTimer(isLoading, delay)

  return (
    <Root
      className={className}
      isDisabled={isDisabled}
      isLoading={isExpired}
      isMultiple={isMultiple}
      variant={variant}
    >
      <BaseSelect
        autoComplete={autoComplete}
        disabled={isDisabled}
        multiple={isMultiple}
        ref={ref}
        required={isRequired}
        variant={variant}
        {...props}
      />
    </Root>
  )
}

export default React.forwardRef(Select)
