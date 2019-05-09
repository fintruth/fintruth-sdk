import { keyframes } from 'styled-components'

export const spin = (from: number = 0, to: number = 359) => keyframes`
  from {
    transform: rotate(${from}deg);
  }

  to {
    transform: rotate(${to}deg);
  }
`
