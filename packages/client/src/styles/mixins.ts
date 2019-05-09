import { em } from 'polished'
import {
  DefaultTheme, // eslint-disable-line import/named
  FlattenInterpolation, // eslint-disable-line import/named
  ThemedStyledProps, // eslint-disable-line import/named
  ViewportBreakpoint, // eslint-disable-line import/named
  css,
} from 'styled-components'

import { spin } from './animations'

type Content = FlattenInterpolation<ThemedStyledProps<{}, DefaultTheme>>
type ViewportBreakpointLower = Exclude<ViewportBreakpoint, 'extraLarge'>
type ViewportBreakpointUpper = Exclude<ViewportBreakpoint, 'small'>

const from = (breakpoint: ViewportBreakpoint) => (content: Content) => css`
  @media screen and (min-width: ${({ theme }) => theme.viewport[breakpoint]}) {
    ${content}
  }
`

const only = (breakpoint: ViewportBreakpointLower) => (content: Content) => {
  const breakpointScale: Record<
    ViewportBreakpointLower,
    ViewportBreakpointUpper
  > = { large: 'extraLarge', medium: 'large', small: 'medium' }

  return css`
    @media screen and (min-width: ${({ theme }) =>
        theme.viewport[breakpoint]}) and (max-width: ${({ theme }) =>
        theme.viewport[breakpointScale[breakpoint]] - 1}px) {
      ${content};
    }
  `
}

const until = (breakpoint: ViewportBreakpoint) => (content: Content) => css`
  @media screen and (max-width: ${({ theme }) =>
      theme.viewport[breakpoint] - 1}px) {
    ${content};
  }
`

export const center = (width: string, height?: string) =>
  css`
    left: calc(50% - (${width} / 2));
    position: absolute;
    top: calc(50% - (${height || width} / 2));
  `

export const control = css`
  align-items: center;
  appearance: none;
  border-radius: ${({ theme }) => theme.control.borderRadius};
  border: ${({ theme }) => theme.control.borderWidth} solid transparent;
  box-shadow: none;
  display: inline-flex;
  font-size: ${({ theme }) => theme.control.fontSize};
  height: ${({ theme }) => theme.control.height};
  justify-content: flex-start;
  line-height: ${({ theme }) => theme.control.lineHeight};
  padding-bottom: ${({ theme }) => theme.control.paddingVertical};
  padding-left: ${({ theme }) => theme.control.paddingHorizontal};
  padding-right: ${({ theme }) => theme.control.paddingHorizontal};
  padding-top: ${({ theme }) => theme.control.paddingVertical};
  position: relative;
  vertical-align: top;

  &:focus,
  &:active {
    outline: none;
  }

  &[disabled] {
    cursor: not-allowed;
  }
`

export const untilSmall = until('small')

export const small = (content: Content) => css`
  @media screen and (min-width: ${({ theme }) => theme.viewport.small}), print {
    ${content};
  }
`

export const smallOnly = only('small')

export const untilMedium = until('medium')

export const medium = from('medium')

export const mediumOnly = only('medium')

export const untilLarge = until('large')

export const large = from('large')

export const largeOnly = only('large')

export const untilExtraLarge = until('large')

export const extraLarge = from('large')

export const unselectable = css`
  -webkit-touch-callout: none;
  user-select: none;
`

export const loader = css`
  animation: ${spin()} 500ms infinite linear;
  border-radius: 999999px;
  border: 2px solid ${({ theme }) => theme.grayLighter};
  border-right-color: transparent;
  border-top-color: transparent;
  content: '';
  display: block;
  height: ${em(16)};
  position: relative;
  width: ${em(16)};
`

export const container = (
  isFluid?: boolean,
  isLarge?: boolean,
  isExtraLarge?: boolean
) => css`
  margin: 0 auto;
  position: relative;

  ${medium(css`
    max-width: ${({ theme }) => theme.viewport.medium - 2 * theme.gap};
    width: ${({ theme }) => theme.viewport.medium - 2 * theme.gap};

    ${isFluid &&
      css`
        margin-left: ${({ theme }) => theme.gap};
        margin-right: ${({ theme }) => theme.gap};
        max-width: none;
        width: auto;
      `}
  `)};

  ${isLarge &&
    untilLarge(css`
      max-width: ${({ theme }) => theme.viewport.large - 2 * theme.gap};
      width: auto;
    `)}

  ${large(css`
    max-width: ${({ theme }) => theme.viewport.large - 2 * theme.gap};
    width: ${({ theme }) => theme.viewport.large - 2 * theme.gap};
  `)};

  ${isExtraLarge &&
    untilExtraLarge(css`
      max-width: ${({ theme }) => theme.viewport.extraLarge - 2 * theme.gap};
      width: auto;
    `)}

  ${extraLarge(css`
    max-width: ${({ theme }) => theme.viewport.extraLarge - 2 * theme.gap};
    width: ${({ theme }) => theme.viewport.extraLarge - 2 * theme.gap};
  `)};
`
