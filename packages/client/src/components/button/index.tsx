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
  background-color: ${({ theme }) => theme.button.backgroundColor};
  border-color: ${({ theme }) => theme.button.borderColor};
  border-width: ${({ theme }) => theme.button.borderWidth};
  color: ${({ theme }) => theme.button.color};
  cursor: pointer;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.button.paddingVertical};
  padding-left: ${({ theme }) => theme.button.paddingHorizontal};
  padding-right: ${({ theme }) => theme.button.paddingHorizontal};
  padding-top: ${({ theme }) => theme.button.paddingVertical};
  text-align: center;
  white-space: nowrap;

  strong {
    color: inherit;
  }

  &:hover {
    border-color: ${({ theme }) => theme.button.hoverBorderColor};
    color: ${({ theme }) => theme.button.hoverColor};
  }

  &:focus {
    border-color: ${({ theme }) => theme.button.focusBorderColor};
    color: ${({ theme }) => theme.button.focusColor};
  }

  &:active {
    background-color: ${({ theme }) => theme.button.backgroundColor};
    border-color: ${({ theme }) => theme.button.activeBorderColor};
    color: ${({ theme }) => theme.button.activeColor};
  }

  &:focus:enabled:not(:active) {
    box-shadow: ${({ theme }) =>
      `${theme.button.focusBoxShadowSize} ${theme.button.focusBoxShadowColor}`};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.button.disabledBackgroundColor};
    border-color: ${({ theme }) => theme.button.disabledBorderColor};
    box-shadow: ${({ theme }) => theme.button.disabledBoxShadow};
    opacity: ${({ theme }) => theme.button.disabledOpacity};
  }

  /* stylelint-disable-next-line declaration-empty-line-before, order/order */
  ${({ isInverted, isLoading, isOutlined, theme, variant }) =>
    variant &&
    css`
      background-color: ${theme.button[variant].color};
      border-color: transparent;
      color: ${theme.button[variant].colorContrast};

      &:hover {
        background-color: ${darken(0.025, theme.button[variant].color)};
        border-color: transparent;
        color: ${theme.button[variant].colorContrast};
      }

      &:focus {
        border-color: transparent;
        color: ${theme.button[variant].colorContrast};
      }

      &:active {
        background-color: ${darken(0.05, theme.button[variant].color)};
        border-color: transparent;
        color: ${theme.button[variant].colorContrast};
      }

      &:focus:enabled:not(:active) {
        box-shadow: ${`${theme.button.focusBoxShadowSize} ${transparentize(
          0.75,
          theme.button[variant].color
        )}`};
      }

      &[disabled] {
        background-color: ${theme.button[variant].color};
        border-color: transparent;
        box-shadow: none;
      }

      ${isLoading &&
        css`
          &::after {
            border-color: transparent transparent
              ${`${theme.button[variant].colorContrast} ${
                theme.button[variant].colorContrast
              }`} !important;
          }
        `}

      ${isInverted &&
        !isOutlined &&
        css`
          background-color: ${theme.button[variant].colorContrast};
          color: ${theme.button[variant].color};

          &:hover {
            background-color: ${darken(
              0.025,
              theme.button[variant].colorContrast
            )};
            color: ${theme.button[variant].color};
          }

          &:focus {
            color: ${theme.button[variant].color};
          }

          &:active {
            background-color: ${darken(
              0.05,
              theme.button[variant].colorContrast
            )};
            color: ${theme.button[variant].color};
          }

          &[disabled] {
            background-color: ${theme.button[variant].colorContrast};
            color: ${theme.button[variant].color};
          }

          ${isLoading &&
            css`
              &::after {
                border-color: transparent transparent
                  ${`${theme.button[variant].color} ${
                    theme.button[variant].color
                  }`} !important;
              }
            `}
        `};

      ${!isInverted &&
        isOutlined &&
        css`
          background-color: transparent;
          border-color: ${theme.button[variant].color};
          color: ${theme.button[variant].color};

          &:hover,
          &:focus {
            background-color: ${theme.button[variant].color};
            border-color: ${theme.button[variant].color};
            color: ${theme.button[variant].colorContrast};
          }

          &:active {
            background-color: ${darken(0.025, theme.button[variant].color)};
            border-color: ${darken(0.025, theme.button[variant].color)};
            color: ${theme.button[variant].colorContrast};
          }

          &[disabled] {
            background-color: transparent;
            border-color: ${theme.button[variant].color};
            color: ${theme.button[variant].color};
          }

          ${isLoading &&
            css`
              &::after {
                border-color: transparent transparent
                  ${`${theme.button[variant].color} ${
                    theme.button[variant].color
                  }`} !important;
              }
            `}
        `}

      ${isInverted &&
        isOutlined &&
        css`
          background-color: transparent;
          border-color: ${theme.button[variant].colorContrast};
          color: ${theme.button[variant].colorContrast};

          &:hover,
          &:focus {
            background-color: ${theme.button[variant].colorContrast};
            color: ${theme.button[variant].color};
          }

          &:active {
            background-color: ${theme.button[variant].colorContrast};
            border-color: ${theme.button[variant].colorContrast};
            color: ${darken(0.025, theme.button[variant].color)};
          }

          &[disabled] {
            background-color: transparent;
            border-color: ${theme.button[variant].colorContrast};
            color: ${theme.button[variant].colorContrast};
          }
        `}
    `};

  /* stylelint-disable-next-line declaration-empty-line-before, order/order */
  ${({ isLoading }) =>
    isLoading &&
    css`
      color: transparent !important;
      pointer-events: none;

      &::after {
        ${loader};
        ${center(em(16))};
        position: absolute !important;
      }
    `};
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
