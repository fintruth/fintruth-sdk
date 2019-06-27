import 'styled-components'

declare module 'styled-components' {
  export type Color =
    | 'black'
    | 'blackBis'
    | 'blackTer'
    | 'blue'
    | 'cyan'
    | 'danger'
    | 'gray'
    | 'grayDark'
    | 'grayDarker'
    | 'grayLight'
    | 'grayLighter'
    | 'green'
    | 'info'
    | 'orange'
    | 'primary'
    | 'purple'
    | 'red'
    | 'success'
    | 'turquoise'
    | 'warning'
    | 'white'
    | 'whiteBis'
    | 'whiteTer'
    | 'yellow'

  export type ColorContrast =
    | 'blueContrast'
    | 'cyanContrast'
    | 'dangerContrast'
    | 'greenContrast'
    | 'infoContrast'
    | 'orangeContrast'
    | 'primaryContrast'
    | 'purpleContrast'
    | 'redContrast'
    | 'successContrast'
    | 'turquoiseContrast'
    | 'warningContrast'
    | 'yellowContrast'

  export type ViewportBreakpoint = 'extraLarge' | 'large' | 'medium' | 'small'

  export interface DefaultTheme
    extends Record<Color, string>,
      Record<ColorContrast, string> {
    backgroundColor: string
    borderColor: string
    borderHoverColor: string
    borderRadius: string
    borderRadiusRounded: string
    fontFamilyCode: string
    fontFamilyMonospace: string
    fontFamilyPrimary: string
    fontFamilySansSerif: string
    fontFamilySecondary: string
    gap: number
    linkActiveBorderColor: string
    linkActiveColor: string
    linkColor: string
    linkColorContrast: string
    linkFocusBorderColor: string
    linkFocusColor: string
    linkHoverBorderColor: string
    linkHoverColor: string
    linkVisitedColor: string
    textColor: string
    textColorContrast: string
    textLightColor: string
    textRendering: string
    textSelectionColor: string
    textStrongColor: string
    viewport: Record<ViewportBreakpoint, number>
  }
}
