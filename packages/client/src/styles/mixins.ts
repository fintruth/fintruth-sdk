import { em, rem } from 'polished'
import {
  DefaultTheme, // eslint-disable-line import/named
  FlattenInterpolation, // eslint-disable-line import/named
  ThemedStyledProps, // eslint-disable-line import/named
  ViewportBreakpoint, // eslint-disable-line import/named
  css,
} from 'styled-components'

import { spin } from './animations'

type Styles = FlattenInterpolation<ThemedStyledProps<{}, DefaultTheme>>

type ViewportBreakpointLower = Exclude<ViewportBreakpoint, 'extraLarge'>

type ViewportBreakpointUpper = Exclude<ViewportBreakpoint, 'small'>

const viewportBreakpointScale: Record<
  ViewportBreakpointLower,
  ViewportBreakpointUpper
> = { large: 'extraLarge', medium: 'large', small: 'medium' }

const from = (breakpoint: ViewportBreakpoint) => (styles: Styles) => css`
  @media screen and (min-width: ${({ theme }) => theme[breakpoint]}px) {
    ${styles}
  }
`

const only = (breakpoint: ViewportBreakpointLower) => (styles: Styles) => css`
  @media screen and (min-width: ${({ theme }) =>
      theme[breakpoint]}px) and (max-width: ${({ theme }) =>
      theme[viewportBreakpointScale[breakpoint]] - 1}px) {
    ${styles}
  }
`

const until = (breakpoint: ViewportBreakpoint) => (styles: Styles) => css`
  @media screen and (max-width: ${({ theme }) => theme[breakpoint] - 1}px) {
    ${styles}
  }
`

export const arrow = (color?: string) => css`
  border: 5px solid transparent;
  border-bottom-width: 0;
  border-top-color: ${({ theme }) => color || theme.linkColor};
  content: '';
  display: block;
  pointer-events: none;
  position: relative;
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

  &:not(:first-child) {
    margin-top: ${rem(4)};
  }
`

export const link = css`
  color: ${({ theme }) => theme.linkColor};
  cursor: pointer;
  text-decoration: none;

  strong {
    color: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.linkHoverColor};
  }
`

export const option = css`
  select[multiple] & {
    padding: ${em(8)} ${em(16)};
  }

  select[disabled][multiple] &,
  fieldset[disabled] select[multiple] & {
    color: ${({ theme }) => theme.textLightColor};
  }
`

export const overflowTouch = css`
  -webkit-overflow-scrolling: touch;
`

export const untilSmall = until('small')

export const small = (styles: Styles) => css`
  @media screen and (min-width: ${({ theme }) => theme.small}px), print {
    ${styles}
  }
`

export const smallOnly = only('small')

export const untilMedium = until('medium')

export const medium = from('medium')

export const mediumOnly = only('medium')

export const untilLarge = until('large')

export const large = from('large')

export const largeOnly = only('large')

export const untilExtraLarge = until('extraLarge')

export const extraLarge = from('extraLarge')

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

export const container = (isFluid = false) => {
  const fluid = css`
    padding-left: ${({ theme }) => theme.gap}px;
    padding-right: ${({ theme }) => theme.gap}px;
  `

  const centered = (breakpoint: ViewportBreakpoint) => css`
    max-width: ${({ theme }) => theme[breakpoint] - 2 * theme.gap}px;
  `

  return css`
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
    width: ${isFluid ? '100%' : 'auto'};

    ${isFluid
      ? fluid
      : css`
          ${medium(centered('medium'))}

          ${untilLarge(centered('large'))}

          ${untilExtraLarge(centered('extraLarge'))}

          ${large(centered('large'))}

          ${extraLarge(centered('extraLarge'))}
        `}
  `
}

const shared = css`
  word-break: break-word;

  &:not(:last-child) {
    margin-bottom: ${rem(24)};
  }

  em,
  span {
    font-weight: inherit;
  }

  sub {
    font-size: ${em(12)};
  }

  sup {
    font-size: ${em(12)};
  }
`

export const subtitle = css`
  ${shared};
  color: ${({ theme }) => theme.grayDark};
  font-size: ${rem(20)};
  font-weight: 400;
  line-height: 1.25;

  strong {
    color: ${({ theme }) => theme.grayDarker};
    font-weight: 600;
  }
`
export const title = css`
  ${shared};
  color: ${({ theme }) => theme.grayDarker};
  font-size: ${rem(32)};
  font-weight: 600;
  line-height: 1.125;

  strong {
    color: inherit;
    font-weight: inherit;
  }
`
