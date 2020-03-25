import 'styled-components'

declare module 'styled-components' {
  type Color = Variant | 'white' | 'black'

  type ColorContrast =
    | 'lightContrast'
    | 'darkContrast'
    | 'primaryContrast'
    | 'infoContrast'
    | 'successContrast'
    | 'warningContrast'
    | 'dangerContrast'

  type Shade =
    | 'blackBis'
    | 'blackTer'
    | 'grayDarker'
    | 'grayDark'
    | 'gray'
    | 'grayLight'
    | 'grayLighter'
    | 'grayLightest'
    | 'whiteTer'
    | 'whiteBis'

  type Variant =
    | 'light'
    | 'dark'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'

  type ViewportBreakpoint = 'small' | 'medium' | 'large' | 'extraLarge'

  interface DefaultTheme
    extends Record<Color, string>,
      Record<ColorContrast, string>,
      Record<Shade, string>,
      Record<ViewportBreakpoint, number> {
    orange: string
    yellow: string
    green: string
    turquoise: string
    cyan: string
    blue: string
    purple: string
    red: string
    orangeContrast: string
    yellowContrast: string
    greenContrast: string
    turquoiseContrast: string
    cyanContrast: string
    blueContrast: string
    purpleContrast: string
    redContrast: string
    backgroundColor: string
    borderColor: string
    borderHoverColor: string
    borderLightColor: string
    borderLightHoverColor: string
    textColor: string
    textColorContrast: string
    textLightColor: string
    textStrongColor: string
    textSelectionBackgroundColor: string
    codeColor: string
    codeBackgroundColor: string
    preColor: string
    preBackgroundColor: string
    linkColor: string
    linkColorContrast: string
    linkVisitedColor: string
    linkHoverColor: string
    linkHoverBorderColor: string
    linkFocusColor: string
    linkFocusBorderColor: string
    linkActiveColor: string
    linkActiveBorderColor: string
    fontFamilySansSerif: string
    fontFamilyMonospace: string
    textRendering: string
    fontFamilyPrimary: string
    fontFamilySecondary: string
    fontFamilyCode: string
    blockSpacing: string
    gap: number
    timingFunction: string
    borderRadiusSmall: string
    borderRadius: string
    borderRadiusLarge: string
    borderRadiusRounded: string
    duration: string
  }
}
