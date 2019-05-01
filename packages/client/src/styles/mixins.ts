import { FlattenInterpolation, ThemedStyledProps, css } from 'styled-components' // eslint-disable-line import/named
import { darken, rem } from 'polished'

import {
  azure,
  jet,
  viewportLg,
  viewportMd,
  viewportSm,
  viewportXl,
  white,
} from './variables'

const media = (queries: string) => (
  content: FlattenInterpolation<ThemedStyledProps<{}, {}>>
) => css`
  @media ${queries} {
    ${content}
  }
`

export const untilSmall = media(`screen and (max-width: ${viewportSm - 1}px)`)

export const small = media(`screen and (min-width: ${viewportSm}px), print`)

export const untilMedium = media(`screen and (max-width: ${viewportMd - 1}px)`)

export const medium = media(`screen and (min-width: ${viewportMd}px)`)

export const large = media(`screen and (min-width: ${viewportLg}px)`)

export const extraLarge = media(`screen and (min-width: ${viewportXl}px)`)

export const isHiddenMobile = css`
  ${untilSmall(css`
    display: none !important;
  `)};
`

export const isHiddenTablet = css`
  ${small(css`
    display: none !important;
  `)};
`

export const card = css`
  padding: ${rem(40)};
  background-color: ${darken(0.026, white)};
`

export const centered = css`
  align-items: center;
  display: flex;
  justify-content: center;
`

export const content = css`
  margin: 0 auto;

  ${medium(css`
    max-width: 960px;
    width: 960px;
  `)};

  ${large(css`
    max-width: 1152px;
    width: 1152px;
  `)};

  ${extraLarge(css`
    max-width: 1344px;
    width: 1344px;
  `)};
`

export const control = css`
  align-items: center;
  appearance: none;
  border-radius: ${({ theme }) => theme.control.radius};
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

  &:disabled,
  fieldset:disabled & {
    cursor: not-allowed;
  }
`

export const fill = css`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`

export const link = css`
  color: ${azure};
  font-size: ${rem(12)};

  &:hover {
    color: ${azure};
    text-decoration: underline;
  }
`

export const title = css`
  color: ${jet};
  font-size: ${rem(24)};
  font-weight: 300;
  margin: 0 0 ${rem(30)};
`
