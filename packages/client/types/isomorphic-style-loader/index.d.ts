declare module 'isomorphic-style-loader' {
  type Content = [string[]]

  type Styles = Record<string, string> & {
    _getContent: () => Content
    _getCss: () => string
    _insertCss: (options?: Options) => () => void
  }

  interface Options {
    prefix?: string
    prepend?: boolean
    replace?: boolean
  }
}
