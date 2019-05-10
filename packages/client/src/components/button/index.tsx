import { Omit } from '@fintruth-sdk/shared'
import { darken, em, transparentize } from 'polished'
import React from 'react'
import styled, { ButtonVariant, css } from 'styled-components' // eslint-disable-line import/named

import { center, control, loader, unselectable } from 'styles/mixins'

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  delay?: number
  isDisabled?: boolean
  isInverted?: boolean
  isLoading?: boolean
  isOutlined?: boolean
  variant?: ButtonVariant
}

const Root = styled.button<Props>`
  ${control};
  ${unselectable};
  border-width: ${({ theme }) => theme.button.borderWidth};
  cursor: pointer;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.button.paddingVertical};
  padding-left: ${({ theme }) => theme.button.paddingHorizontal};
  padding-right: ${({ theme }) => theme.button.paddingHorizontal};
  padding-top: ${({ theme }) => theme.button.paddingVertical};
  text-align: center;
  white-space: nowrap;

  ${({ isInverted, isLoading, isOutlined, theme, variant }) => {
    if (variant) {
      const { color, colorContrast } = theme.button[variant]

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
            box-shadow: ${theme.button.focusBoxShadowSize}
              ${transparentize(0.75, colorContrast)};
          }

          &:active {
            background-color: ${darken(0.025, colorContrast)};
            border-color: transparent;
            color: ${color};
          }

          &[disabled] {
            background-color: transparent;
            border-color: ${colorContrast};
            color: ${colorContrast};
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
            box-shadow: ${theme.button.focusBoxShadowSize}
              ${transparentize(0.75, color)};
          }

          &:active {
            background-color: ${darken(0.05, colorContrast)};
          }

          &[disabled] {
            background-color: ${colorContrast};
            opacity: ${theme.button.disabledOpacity};
          }
        `
      } else if (isOutlined) {
        return css`
          background-color: transparent ${isLoading && '!important'};
          border-color: ${color} ${isLoading && '!important'};
          color: ${color};

          &:hover {
            background-color: ${color};
            border-color: transparent;
            color: ${colorContrast};
          }

          &:focus:not(:active):enabled {
            box-shadow: ${theme.button.focusBoxShadowSize}
              ${transparentize(0.75, color)};
          }

          &:active {
            background-color: ${darken(0.025, color)};
            border-color: transparent;
            color: ${colorContrast};
          }

          &[disabled] {
            background-color: transparent;
            border-color: ${color};
            color: ${color};
            opacity: ${theme.button.disabledOpacity};
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
          box-shadow: ${theme.button.focusBoxShadowSize}
            ${transparentize(0.75, color)};
        }

        &:active {
          background-color: ${darken(0.05, color)};
        }

        &[disabled] {
          background-color: ${color};
          opacity: ${theme.button.disabledOpacity};
        }
      `
    }

    return css`
      background-color: ${theme.button.backgroundColor}
        ${isLoading && '!important'};
      border-color: ${theme.button.borderColor} ${isLoading && '!important'};
      color: ${theme.button.color};

      &:hover {
        border-color: ${theme.button.hoverBorderColor};
        color: ${theme.button.hoverColor};
      }

      &:focus {
        border-color: ${theme.button.focusBorderColor};
        color: ${theme.button.focusColor};

        &:not(:active):enabled {
          box-shadow: ${theme.button.focusBoxShadowSize}
            ${theme.button.focusBoxShadowColor};
        }
      }

      &:active {
        border-color: ${theme.button.activeBorderColor};
        color: ${theme.button.activeColor};
      }

      &[disabled] {
        background-color: ${theme.button.disabledBackgroundColor};
        border-color: ${theme.button.disabledBorderColor};
        box-shadow: ${theme.button.disabledBoxShadow};
        color: ${theme.button.disabledColor};
        opacity: ${theme.button.disabledOpacity};
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
              ? theme.button[variant].color
              : theme.button[variant].colorContrast)
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
