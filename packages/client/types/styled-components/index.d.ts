import 'styled-components'

declare module 'styled-components' {
  export interface Body {
    color: string
    fontFamily: string
    fontWeight: number
    lineHeight: number
  }

  export interface Code {
    backgroundColor: string
    color: string
    fontFamily: string
    fontSize: string
    fontWeight: number
    padding: string
  }

  export interface DefaultTheme extends Variables {
    body: Body
    code: Code
    hr: Hr
    html: Html
    pre: Pre
    strong: Strong
  }

  export interface Hr {
    backgroundColor: string
    height: string
    margin: string
  }

  export interface Html {
    backgroundColor: string
    fontSize: string
    overflowX: string
    overflowY: string
    textRendering: string
  }

  export interface Pre {
    backgroundColor: string
    color: string
  }

  export interface Strong {
    color: string
    fontWeight: number
  }

  export interface Variables {
    backgroundColor: string
    black: string
    blackBis: string
    blackTer: string
    blue: string
    blueContrast: string
    borderColor: string
    borderHoverColor: string
    cyan: string
    cyanContrast: string
    danger: string
    dangerContrast: string
    darkContrast: string
    fontFamilyCode: string
    fontFamilyMonospace: string
    fontFamilyPrimary: string
    fontFamilySansSerif: string
    fontFamilySecondary: string
    gap: number
    gray: string
    grayDark: string
    grayDarker: string
    grayLight: string
    grayLighter: string
    green: string
    greenContrast: string
    info: string
    infoContrast: string
    lightContrast: string
    linkActiveBorderColor: string
    linkActiveColor: string
    linkColor: string
    linkColorContrast: string
    linkFocusBorderColor: string
    linkFocusColor: string
    linkHoverBorderColor: string
    linkHoverColor: string
    linkVisitedColor: string
    orange: string
    orangeContrast: string
    primary: string
    primaryContrast: string
    purple: string
    purpleContrast: string
    red: string
    redContrast: string
    success: string
    successContrast: string
    textColor: string
    textColorContrast: string
    textLightColor: string
    textRendering: string
    textSelectionColor: string
    textStrongColor: string
    turquoise: string
    turquoiseContrast: string
    viewportExtraLarge: number
    viewportLarge: number
    viewportMedium: number
    viewportSmall: number
    warning: string
    warningContrast: string
    white: string
    whiteBis: string
    whiteTer: string
    yellow: string
    yellowContrast: string
  }
}
