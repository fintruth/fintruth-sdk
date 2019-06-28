import 'react'
import { CSSProp, DefaultTheme } from 'styled-components' // eslint-disable-line import/named

declare module 'react' {
  interface Attributes {
    css?: CSSProp<DefaultTheme>
  }
}
