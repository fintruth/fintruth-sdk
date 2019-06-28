import { css } from 'styled-components'

export const containerHorizontal = css`
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  position: relative;
`

export const ctaHorizontalLeft = css`
  &:not(:only-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`

export const nameHorizontalRight = css`
  [data-file-field-call-to-action] + & {
    border-bottom-left-radius: 0;
    border-left-width: 0;
    border-top-left-radius: 0;
  }

  &:not(:first-child) {
    margin-top: 0;
  }
`
