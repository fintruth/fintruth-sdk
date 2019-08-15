import { keyframes } from 'styled-components'

export const spin = (from = 0, to = 359) => keyframes`
  from {
    transform: rotate(${from}deg);
  }

  to {
    transform: rotate(${to}deg);
  }
`
