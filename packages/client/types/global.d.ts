interface Window {
  __APOLLO_STATE__: {}
}

declare const __IS_BROWSER__: boolean
declare const __IS_DEV__: boolean

declare module '*.bmp' {
  const src: string

  export default src
}

declare module '*.gif' {
  const src: string

  export default src
}

declare module '*.jpeg' {
  const src: string

  export default src
}

declare module '*.jpg' {
  const src: string

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

declare module '*.webp' {
  const src: string

  export default src
}

declare namespace NodeJS {
  export interface Global {
    navigator?: Navigator | { userAgent: string }
  }
}
