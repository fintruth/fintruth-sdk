import { em, rem } from 'polished'
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
  @media screen and (min-width: ${({ theme }) =>
      theme.viewport[breakpoint]}px) {
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
        theme.viewport[breakpoint]}px) and (max-width: ${({ theme }) =>
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
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: none;
  display: inline-flex;
  font-size: ${rem(16)};
  height: ${em(36)};
  justify-content: flex-start;
  line-height: 1.5;
  padding: calc(${em(6)} - 1px) calc(${em(10)} - 1px);
  position: relative;
  vertical-align: top;

  &:focus,
  &:active {
    outline: none;
  }

  &[disabled],
  fieldset[disabled] & {
    cursor: not-allowed;
  }
`

export const help = (color?: string) => css`
  color: ${({ theme }) => color || theme.textColor};
  display: block;
  font-size: ${rem(12)};
  margin-top: ${rem(4)};
`

export const untilSmall = until('small')

export const small = (content: Content) => css`
  @media screen and (min-width: ${({ theme }) => theme.viewport.small}px),
    print {
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

export const loader = (color?: string) => css`
  animation: ${spin()} 500ms infinite linear;
  border: 2px solid ${({ theme }) => color || theme.grayLighter};
  border-radius: ${({ theme }) => theme.borderRadiusRounded};
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
    max-width: ${({ theme }) => theme.viewport.medium - 2 * theme.gap}px;
    width: ${({ theme }) => theme.viewport.medium - 2 * theme.gap}px;

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
      max-width: ${({ theme }) => theme.viewport.large - 2 * theme.gap}px;
      width: auto;
    `)}

  ${large(css`
    max-width: ${({ theme }) => theme.viewport.large - 2 * theme.gap}px;
    width: ${({ theme }) => theme.viewport.large - 2 * theme.gap}px;
  `)};

  ${isExtraLarge &&
    untilExtraLarge(css`
      max-width: ${({ theme }) => theme.viewport.extraLarge - 2 * theme.gap}px;
      width: auto;
    `)}

  ${extraLarge(css`
    max-width: ${({ theme }) => theme.viewport.extraLarge - 2 * theme.gap}px;
    width: ${({ theme }) => theme.viewport.extraLarge - 2 * theme.gap}px;
  `)};
`
