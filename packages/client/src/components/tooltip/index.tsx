import {
  TooltipPopup,
  TooltipPopupProps,
  TooltipProps,
  useTooltip,
} from '@reach/tooltip'
import styles from '@reach/tooltip/styles.css'
import useStyles from 'isomorphic-style-loader/useStyles'
import { em, rem, transparentize } from 'polished'
import React from 'react'
import styled, { Color, ColorContrast, css } from 'styled-components' // eslint-disable-line import/named

export type Variant = 'danger' | 'primary'

interface PopupProps extends TooltipPopupProps {
  variant?: Variant
}

interface Props extends TooltipProps {
  position?: (rectA: DOMRect, rectB: DOMRect) => React.CSSProperties
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

const standard = css`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`

const variation = (color: string, colorContrast: string) => css`
  background-color: ${color};
  color: ${colorContrast};
`

const Popup = styled(TooltipPopup)<PopupProps>`
  border-radius: ${({ theme }) => theme.borderRadius};
  line-height: 1.5;
  max-width: ${rem(384)};
  word-break: keep-all;

  &[data-reach-tooltip] {
    border: unset;
    box-shadow: 0 2px 3px ${({ theme }) => transparentize(0.9, theme.black)},
      0 0 0 1px ${({ theme }) => transparentize(0.9, theme.black)};
    font-size: ${rem(12)};
    padding: ${em(6)} ${em(12)};
    pointer-events: none;
    position: absolute;
    white-space: pre-line;
    z-index: 1;

    ${({ theme, variant }) =>
      variant
        ? variation(theme[colors[variant]], theme[colorContrasts[variant]])
        : standard};
  }
`

const Tooltip: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { children, variant, ...props }: Props,
  ref?: React.Ref<HTMLDivElement>
) => {
  const [trigger, tooltip] = useTooltip()

  useStyles(styles)

  return (
    <>
      {React.cloneElement(React.Children.only(children), trigger)}
      <Popup ref={ref} variant={variant} {...tooltip} {...props} />
    </>
  )
}

export default React.forwardRef(Tooltip)
