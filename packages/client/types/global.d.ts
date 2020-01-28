declare const __IS_DEV__: boolean

declare module '*.css' {
  import { Styles } from 'isomorphic-style-loader' // eslint-disable-line import/order

  const src: Styles

  export default src
}

declare module '*.png' {
  const src: string

  export default src
}

declare module '*.svg' {
  import {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    SVGAttributes,
  } from 'react'

  const src: ForwardRefExoticComponent<
    PropsWithoutRef<SVGAttributes<SVGSVGElement>> & RefAttributes<SVGSVGElement>
  >

  export default src
}
