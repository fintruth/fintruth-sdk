declare module 'isomorphic-style-loader/useStyles' {
  import { Styles } from 'isomorphic-style-loader'

  function useStyles(...styles: Styles[]): void

  export default useStyles
}
