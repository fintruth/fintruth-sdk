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

  export interface PartialDefaultTheme extends Partial<Variables> {
    body?: Partial<Body>
    code?: Partial<Code>
    hr?: Partial<Hr>
    html?: Partial<Html>
    pre?: Partial<Pre>
    strong?: Partial<Strong>
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
    blueInvert: string
    borderColor: string
    borderHoverColor: string
    cyan: string
    cyanInvert: string
    dangerColor: string
    dangerInvertColor: string
    fontFamilyCode: string
    fontFamilyMonospace: string
    fontFamilyPrimary: string
    fontFamilySansSerif: string
    fontFamilySecondary: string
    fontSize1: string
    fontSize2: string
    fontSize3: string
    fontSize4: string
    fontSize5: string
    fontSize6: string
    fontSize7: string
    fontSizeLarge: string
    fontSizeMedium: string
    fontSizeNormal: string
    fontSizeSmall: string
    fontWeightBold: number
    fontWeightLight: number
    fontWeightMedium: number
    fontWeightNormal: number
    fontWeightSemibold: number
    gap: number
    gray: string
    grayDark: string
    grayDarker: string
    grayLight: string
    grayLighter: string
    green: string
    greenInvert: string
    infoColor: string
    infoInvertColor: string
    linkActiveBorderColor: string
    linkActiveColor: string
    linkColor: string
    linkFocusBorderColor: string
    linkFocusColor: string
    linkHoverBorderColor: string
    linkHoverColor: string
    linkInvertColor: string
    linkVisitedColor: string
    orange: string
    orangeInvert: string
    primaryColor: string
    primaryInvertColor: string
    purple: string
    purpleInvert: string
    readableDark: string
    readableLight: string
    red: string
    redInvert: string
    successColor: string
    successInvertColor: string
    textColor: string
    textInvertColor: string
    textLightColor: string
    textRendering: string
    textSelectionColor: string
    textStrongColor: string
    turquoise: string
    turquoiseInvert: string
    viewportExtraLarge: number
    viewportLarge: number
    viewportMedium: number
    viewportSmall: number
    warningColor: string
    warningInvertColor: string
    white: string
    whiteBis: string
    whiteTer: string
    yellow: string
    yellowInvert: string
  }
}
