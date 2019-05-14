import { Omit } from '@fintruth-sdk/shared'
import { darken, em, transparentize } from 'polished'
import React from 'react'
import styled, { Color, ColorContrast, css } from 'styled-components' // eslint-disable-line import/named

import { center, control, loader, unselectable } from 'styles/mixins'

export type Variant = 'danger' | 'primary'

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  delay?: number
  isDisabled?: boolean
  isInverted?: boolean
  isLoading?: boolean
  isOutlined?: boolean
  variant?: Variant
}

const colors: Record<Variant, Color> = {
  danger: 'danger',
  primary: 'primary',
}

const colorContrasts: Record<Variant, ColorContrast> = {
  danger: 'dangerContrast',
  primary: 'primaryContrast',
}

const Root = styled.button<Props>`
  ${control};
  ${unselectable};
  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  padding: calc(${em(6)} - 1px) ${em(12)};
  text-align: center;
  white-space: nowrap;

  ${({ isInverted, isLoading, isOutlined, theme, variant }) => {
    const disabledOpacity = 0.5
    const focusBoxShadowSize = `0 0 0 ${em(2)}`

    if (variant) {
      const color = theme[colors[variant]]
      const colorContrast = theme[colorContrasts[variant]]

      if (isInverted && isOutlined) {
        return css`
          background-color: transparent ${isLoading && '!important'};
          border-color: ${colorContrast} ${isLoading && '!important'};
          color: ${colorContrast};

          &:hover {
            background-color: ${colorContrast};
            color: ${color};
          }

          &:focus:not(:active):enabled {
            box-shadow: ${focusBoxShadowSize}
              ${transparentize(0.75, colorContrast)};
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
        `
      } else if (isInverted) {
        return css`
          background-color: ${colorContrast} ${isLoading && '!important'};
          border-color: transparent;
          color: ${color};

          &:hover {
            background-color: ${darken(0.025, colorContrast)};
          }

          &:focus:not(:active):enabled {
            box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
          }

          &:active {
            background-color: ${darken(0.05, colorContrast)};
          }

          &[disabled],
          fieldset[disabled] & {
            background-color: ${colorContrast};
            opacity: ${disabledOpacity};
          }
        `
      } else if (isOutlined) {
        return css`
          background-color: transparent ${isLoading && '!important'};
          border-color: ${color} ${isLoading && '!important'};
          color: ${color};

          &:hover {
            background-color: ${color};
            color: ${colorContrast};
          }

          &:focus:not(:active):enabled {
            box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
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
        `
      }

      return css`
        background-color: ${color} ${isLoading && '!important'};
        border-color: transparent;
        color: ${colorContrast};

        &:hover {
          background-color: ${darken(0.025, color)};
        }

        &:focus:not(:active):enabled {
          box-shadow: ${focusBoxShadowSize} ${transparentize(0.75, color)};
        }

        &:active {
          background-color: ${darken(0.05, color)};
        }

        &[disabled],
        fieldset[disabled] & {
          background-color: ${color};
          opacity: ${disabledOpacity};
        }
      `
    }

    return css`
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

        &:not(:active):enabled {
          box-shadow: ${focusBoxShadowSize}
            ${transparentize(0.75, theme.linkColor)};
        }
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
    `
  }};

  ${({ isInverted, isLoading, isOutlined, theme, variant }) =>
    isLoading &&
    css`
      box-shadow: none !important;
      color: transparent !important;
      pointer-events: none;

      &::after {
        ${loader(
          variant &&
            ((isInverted && !isOutlined) || (!isInverted && isOutlined)
              ? theme[colors[variant]]
              : theme[colorContrasts[variant]])
        )};
        ${center(em(16))};
        position: absolute !important;
      }
    `}

  strong {
    color: inherit;
  }
`

const Button: React.FunctionComponent<Props> = ({
  delay = 200,
  isDisabled,
  isLoading,
  ...props
}: Props) => {
  const [isLoaderVisible, setIsLoaderVisible] = React.useState(false)

  React.useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => setIsLoaderVisible(true), delay)

      return () => clearTimeout(timeout)
    }

    setIsLoaderVisible(false)

    return undefined
  }, [delay, isLoading])

  return <Root {...props} isLoading={isLoaderVisible} disabled={isDisabled} />
}

export default Button
