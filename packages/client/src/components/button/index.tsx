import { darken, em, transparentize } from 'polished'
import React from 'react'
import styled, { DefaultTheme, Variant, css } from 'styled-components' // eslint-disable-line import/named

import { useTimer } from 'hooks/time'
import { center, control, loader, unselectable } from 'styles/mixins'
import { variantColorContrasts, variantColors } from 'styles/theme'

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  delay?: number
  isDisabled?: boolean
  isInverted?: boolean
  isLoading?: boolean
  isOutlined?: boolean
  variant?: Variant
}

interface RootProps extends Omit<Props, 'isDisabled'> {
  disabled?: boolean
  isLoading: boolean
}

const disabledOpacity = 0.5
const focusBoxShadowSize = `0 0 0 ${em(2)}`

const inverted = (
  color: string,
  colorContrast: string,
  isLoading?: boolean
) => css`
  background-color: ${colorContrast} ${isLoading && '!important'};
  border-color: transparent;
  color: ${color};

  &:hover {
    background-color: ${darken(0.025, colorContrast)};
  }

  &:active {
    background-color: ${darken(0.05, colorContrast)};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${colorContrast};
    opacity: ${disabledOpacity};
  }

  &:focus:not(:active):enabled {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
  }
`

const invertedOutlined = (
  color: string,
  colorContrast: string,
  isLoading?: boolean
) => css`
  background-color: transparent ${isLoading && '!important'};
  border-color: ${colorContrast} ${isLoading && '!important'};
  color: ${colorContrast};

  &:hover {
    background-color: ${colorContrast};
    color: ${color};
  }

  &:active {
    background-color: ${darken(0.025, colorContrast)};
    border-color: transparent;
    color: ${color};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: transparent;
    border-color: ${colorContrast};
    color: ${colorContrast};
    opacity: ${disabledOpacity};
  }

  &:focus:not(:active):enabled {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, colorContrast)};
  }
`

const loading = (color?: string) => css`
  box-shadow: none !important;
  color: transparent !important;
  pointer-events: none;

  &::after {
    ${loader(color)}
    ${center(em(16))}
    position: absolute !important;
  }
`

const outlined = (
  color: string,
  colorContrast: string,
  isLoading?: boolean
) => css`
  background-color: transparent ${isLoading && '!important'};
  border-color: ${color} ${isLoading && '!important'};
  color: ${color};

  &:hover {
    background-color: ${color};
    color: ${colorContrast};
  }

  &:active {
    background-color: ${darken(0.025, color)};
    border-color: transparent;
    color: ${colorContrast};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: transparent;
    border-color: ${color};
    color: ${color};
    opacity: ${disabledOpacity};
  }

  &:focus:not(:active):enabled {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
  }
`

const standard = (theme: DefaultTheme, isLoading?: boolean) => css`
  background-color: ${theme.white} ${isLoading && '!important'};
  border-color: ${theme.grayLighter} ${isLoading && '!important'};
  color: ${theme.grayDarker};

  &:hover {
    border-color: ${theme.linkHoverBorderColor};
    color: ${theme.linkHoverColor};
  }

  &:focus {
    border-color: ${theme.linkFocusBorderColor};
    color: ${theme.linkFocusColor};
  }

  &:active {
    border-color: ${theme.linkActiveBorderColor};
    color: ${theme.linkActiveColor};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${theme.white};
    border-color: ${theme.grayLighter};
    color: ${theme.grayDarker};
    opacity: ${disabledOpacity};
  }

  &:focus:not(:active):enabled {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, theme.linkColor)};
  }
`

const variation = (
  color: string,
  colorContrast: string,
  isLoading?: boolean
) => css`
  background-color: ${color} ${isLoading && '!important'};
  border-color: transparent;
  color: ${colorContrast};

  &:hover {
    background-color: ${darken(0.025, color)};
  }

  &:active {
    background-color: ${darken(0.05, color)};
  }

  &[disabled],
  fieldset[disabled] & {
    background-color: ${color};
    opacity: ${disabledOpacity};
  }

  &:focus:not(:active):enabled {
    box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
  }
`

const Root = styled.button<RootProps>`
  ${control}
  ${unselectable}
  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  padding: calc(${em(6)} - 1px) ${em(12)};
  text-align: center;
  white-space: nowrap;

  ${({ isInverted, isLoading, isOutlined, theme, variant }) => {
    if (variant) {
      const color = theme[variantColors[variant]]
      const colorContrast = theme[variantColorContrasts[variant]]

      if (isInverted && isOutlined) {
        return invertedOutlined(color, colorContrast, isLoading)
      } else if (isInverted) {
        return inverted(color, colorContrast, isLoading)
      } else if (isOutlined) {
        return outlined(color, colorContrast, isLoading)
      }

      return variation(color, colorContrast, isLoading)
    }

    return standard(theme, isLoading)
  }}

  ${({ isInverted, isLoading, isOutlined, theme, variant }) =>
    isLoading &&
    loading(
      variant &&
        ((isInverted && !isOutlined) || (!isInverted && isOutlined)
          ? theme[variantColors[variant]]
          : theme[variantColorContrasts[variant]])
    )}

  strong {
    color: inherit;
  }
`

const Button: React.RefForwardingComponent<HTMLButtonElement, Props> = (
  { delay = 200, isDisabled, isLoading = false, ...props }: Props,
  ref?: React.Ref<HTMLButtonElement>
) => {
  const isLoaderVisible = useTimer(isLoading, delay)

  return (
    <Root
      disabled={isDisabled}
      isLoading={isLoaderVisible}
      ref={ref}
      {...props}
    />
  )
}

export default React.forwardRef(Button)
