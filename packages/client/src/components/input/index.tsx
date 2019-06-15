import { Omit } from '@fintruth-sdk/common'
import { darken, em, transparentize } from 'polished'
import React from 'react'
import styled, { Color, css } from 'styled-components' // eslint-disable-line import/named
import { createTextMaskInputElement } from 'text-mask-core'

import { useTimer } from 'hooks/time'
import { control, loader } from 'styles/mixins'
import { setRef } from 'utilities/react'

export type Type = 'email' | 'password' | 'tel' | 'text'
export type Variant = 'danger'

interface BaseInputProps {
  variant?: Variant
}

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required'
  > {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  delay?: number
  isDisabled?: boolean
  isGuided?: boolean
  isLoading?: boolean
  isRequired?: boolean
  mask?: (RegExp | string)[]
  type?: Type
  variant?: Variant
}

interface RootProps {
  isDisabled?: boolean
  isLoading?: boolean
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

  ${({ isDisabled, isLoading, theme, variant }) =>
    !isDisabled && isLoading && loading(variant && theme[colors[variant]])};
`

const BaseInput = styled.input<BaseInputProps>`
  ${control};
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: inset 0 1px 2px ${({ theme }) => transparentize(0.9, theme.black)};
  color: ${({ theme }) => theme.grayDarker};
  display: block;
  max-width: 100%;
  width: 100%;

  ${({ theme, variant }) =>
    variant ? variation(theme[colors[variant]]) : standard};

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
    className,
    delay,
    isDisabled,
    isGuided = true,
    isLoading = false,
    isRequired,
    mask,
    onChange,
    type = 'text',
    value,
    variant,
    ...props
  }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const [maskedInput, setMaskedInput] = React.useState()
  const input = React.useRef<HTMLInputElement>()
  const isExpired = useTimer(isLoading, delay)

  const initTextMask = React.useCallback(() => {
    const textMask = createTextMaskInputElement({
      guide: isGuided,
      inputElement: input.current,
      keepCharPositions: false,
      mask: mask || false,
      placeholderChar: '\u2000',
      showMask: false,
    })

    textMask.update(value)
    setMaskedInput(textMask)
  }, [isGuided, mask, value])

  React.useEffect(() => {
    initTextMask()
  }, [initTextMask, isGuided, mask])

  React.useEffect(() => {
    if (input && input.current && value !== input.current.value) {
      initTextMask()
    }
  }, [initTextMask, value])

  return (
    <Root
      className={className}
      isDisabled={isDisabled}
      isLoading={isExpired}
      variant={variant}
    >
      <BaseInput
        autoComplete={autoComplete}
        disabled={isDisabled}
        onChange={event => {
          maskedInput.update()

          if (onChange) {
            onChange(event)
          }
        }}
        ref={instance => {
          setRef(ref, instance)
          setRef(input, instance)
        }}
        required={isRequired}
        type={type}
        value={value}
        variant={variant}
        {...props}
      />
    </Root>
  )
}

export default React.forwardRef(Input)
