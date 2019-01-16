declare module '*.bmp' {
  const src: string

  export default src // eslint-disable-line import/export
}

declare module '*.gif' {
  const src: string

  export default src // eslint-disable-line import/export
}

declare module '*.jpeg' {
  const src: string

  export default src // eslint-disable-line import/export
}

declare module '*.jpg' {
  const src: string

  export default src // eslint-disable-line import/export
}

declare module '*.png' {
  const src: string

  export default src // eslint-disable-line import/export
}

declare module '*.svg' {
  import * as React from 'react'

  const src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  export default src // eslint-disable-line import/export
}

declare module '*.webp' {
  const src: string

  export default src // eslint-disable-line import/export
}
