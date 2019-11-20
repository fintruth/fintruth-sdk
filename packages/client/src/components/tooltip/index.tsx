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
import styled, { Variant, css } from 'styled-components'

import { variantColorContrasts, variantColors } from 'styles/theme'

interface PopupProps extends TooltipPopupProps {
  variant?: Variant
}

interface Props extends TooltipProps {
  position?: (rectA: DOMRect, rectB: DOMRect) => React.CSSProperties
  variant?: Variant
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

  &[data-tooltip] {
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
        ? variation(
            theme[variantColors[variant]],
            theme[variantColorContrasts[variant]]
          )
        : standard}
  }
`

const Tooltip = React.forwardRef<HTMLDivElement, Props>(function Tooltip(
  { children, variant, ...props }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  const [trigger, tooltip] = useTooltip()

  useStyles(styles)

  return (
    <>
      {React.cloneElement(React.Children.only(children), trigger)}
      <Popup
        data-tooltip=""
        ref={ref}
        variant={variant}
        {...tooltip}
        {...props}
      />
    </>
  )
})

export default Tooltip
