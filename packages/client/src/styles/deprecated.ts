import { darken, rem } from 'polished'
import { css } from 'styled-components'

export const azure = '#004cff'
export const black = '#000'
export const heather = '#c3c7ca'
export const jet = '#121418'
export const lilia = '#ebedf0'
export const raven = '#333'
export const steel = '#828991'
export const watermelon = '#ed5357'
export const white = '#fff'

export const card = css`
  padding: ${rem(40)};
  background-color: ${darken(0.026, white)};
`

export const centered = css`
  align-items: center;
  display: flex;
  justify-content: center;
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
