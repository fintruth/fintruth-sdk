import { darken, em, transparentize } from 'polished'
import React from 'react'
import styled, { Variant, css } from 'styled-components'
import { createTextMaskInputElement } from 'text-mask-core'

import { useTimer } from 'hooks/time'
import { control, loader } from 'styles/mixins'
import { variantColors } from 'styles/theme'
import { setRef } from 'utils/react'

export type Type = 'email' | 'password' | 'tel' | 'text'

interface BaseInputProps {
  variant?: Variant
}

export interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'required'
  > {
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

const focusBoxShadowSize = `0 0 0 ${em(2)}`

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

const loading = (color?: string) => css`
  &::after {
    ${loader(color)}
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
    !isDisabled &&
    isLoading &&
    loading(variant && theme[variantColors[variant]])}
`

const BaseInput = styled.input<BaseInputProps>`
  ${control}
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: inset 0 1px 2px ${({ theme }) =>
    transparentize(0.9, theme.black)};
  color: ${({ theme }) => theme.grayDarker};
  display: block;
  max-width: 100%;
  width: 100%;

  ${({ theme, variant }) =>
    variant ? variation(theme[variantColors[variant]]) : standard}

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

const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
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
  ref?: React.Ref<HTMLInputElement>
) {
  const [maskedInput, setMaskedInput] = React.useState({ update: noop })
  const input = React.useRef<HTMLInputElement>()
  const isLoaderVisible = useTimer(isLoading, delay)

  const handleChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      maskedInput.update()

      return onChange && onChange(event)
    },
    [maskedInput, onChange]
  )

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

    return setMaskedInput(textMask)
  }, [isGuided, mask, value])

  React.useEffect(() => initTextMask(), [initTextMask, isGuided, mask])

  React.useEffect(() => {
    if (input.current && value !== input.current.value) {
      return initTextMask()
    }
  }, [initTextMask, value])

  return (
    <Root
      className={className}
      isDisabled={isDisabled}
      isLoading={isLoaderVisible}
      variant={variant}
    >
      <BaseInput
        autoComplete={autoComplete}
        disabled={isDisabled}
        onChange={handleChange}
        ref={(instance) => {
          if (ref) {
            setRef(ref, instance)
          }

          return setRef(input, instance)
        }}
        required={isRequired}
        type={type}
        value={value}
        variant={variant}
        {...props}
      />
    </Root>
  )
})

export default Input
