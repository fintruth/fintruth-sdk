import { css } from 'styled-components'
import { rem } from 'polished'

export const button = css`
  align-self: center;
  margin-top: ${rem(40)};
`

export const form = css`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

export const notice = css`
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`
