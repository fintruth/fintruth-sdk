import 'styled-components'

declare module 'styled-components' {
  export type NoticeVariant = 'danger' | 'default' | 'success'

  interface Body {
    color: string
    fontFamily: string
    fontWeight: number
    lineHeight: number
  }

  interface Code {
    backgroundColor: string
    color: string
    fontFamily: string
    fontSize: string
    fontWeight: number
    padding: string
  }

  interface Control {
    borderWidth: string
    fontSize: string
    height: string
    lineHeight: number
    paddingHorizontal: string
    paddingVertical: string
    radius: string
  }

  export interface DefaultTheme extends Variables {
    body: Body
    code: Code
    control: Control
    file: File
    hr: Hr
    html: Html
    label: Label
    notice: Notice
    pre: Pre
    radio: Radio
    strong: Strong
  }

  interface File {
    borderColor: string
    ctaActiveColor: string
    ctaBackgroundColor: string
    ctaColor: string
    ctaHoverColor: string
    nameBorderColor: string
    nameBorderStyle: string
    nameBorderWidth: string
    radius: string
  }

  interface Hr {
    backgroundColor: string
    height: string
    margin: string
  }

  interface Html {
    backgroundColor: string
    fontSize: string
    overflowX: string
    overflowY: string
    textRendering: string
  }

  interface Label {
    color: string
    fontSize: string
    fontWeight: number
  }

  interface Notice extends Record<NoticeVariant, string> {
    fontSize: string
  }

  interface Pre {
    backgroundColor: string
    color: string
  }

  interface Radio {
    disabledColor: string
    hoverColor: string
    toggleCheckedColor: string
    toggleColor: string
    toggleDisabledColor: string
  }

  interface Strong {
    color: string
    fontWeight: number
  }

  interface Variables {
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
    inputDisabledBackgroundColor: string
    inputDisabledBorderColor: string
    inputDisabledColor: string
    inputDisabledPlaceholderColor: string
    inputHoverBorderColor: string
    inputHoverColor: string
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
