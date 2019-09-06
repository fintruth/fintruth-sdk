declare module 'isomorphic-style-loader/StyleContext' {
  import { Styles } from 'isomorphic-style-loader'
  import { Context } from 'react'

  interface DefaultValue {
    insertCss: ((...styles: Styles[]) => () => void) | null
  }

  const src: Context<DefaultValue>

  export default src
}
