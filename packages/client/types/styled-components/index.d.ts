import 'styled-components'

declare module 'styled-components' {
  export type ButtonVariant = 'danger' | 'primary'
  export type InputStatus = 'danger' | 'default'
  export type NoticeVariant = 'danger' | 'default' | 'success'
  export type ViewportBreakpoint = 'extraLarge' | 'large' | 'medium' | 'small'

  interface Body {
    color: string
    fontFamily: string
    fontWeight: number
    lineHeight: number
  }

  interface Button extends Record<ButtonVariant, ButtonVariantData> {
    activeBorderColor: string
    activeColor: string
    backgroundColor: string
    borderColor: string
    borderWidth: string
    color: string
    disabledBackgroundColor: string
    disabledBorderColor: string
    disabledBoxShadow: string
    disabledColor: string
    disabledOpacity: number
    focusBorderColor: string
    focusBoxShadowColor: string
    focusBoxShadowSize: string
    focusColor: string
    hoverBorderColor: string
    hoverColor: string
    paddingHorizontal: string
    paddingVertical: string
  }

  interface ButtonVariantData {
    color: string
    colorContrast: string
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
    borderRadius: string
    borderWidth: string
    fontSize: string
    height: string
    lineHeight: number
    paddingHorizontal: string
    paddingVertical: string
  }

  export interface DefaultTheme extends Variables {
    body: Body
    button: Button
    code: Code
    control: Control
    file: File
    hr: Hr
    html: Html
    input: Input
    label: Label
    notice: Notice
    pre: Pre
    radio: Radio
    strong: Strong
    viewport: Record<ViewportBreakpoint, number>
  }

  interface File {
    borderColor: string
    borderRadius: string
    ctaActiveColor: string
    ctaBackgroundColor: string
    ctaColor: string
    ctaHoverColor: string
    nameBorderColor: string
    nameBorderStyle: string
    nameBorderWidth: string
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

  interface Input extends Record<InputStatus, InputStatusData> {
    backgroundColor: string
    borderRadius: string
    boxShadow: string
    color: string
    disabledBackgroundColor: string
    disabledBorderColor: string
    disabledColor: string
    disabledPlaceholderColor: string
    focusBorderColor: string
    focusBoxShadowSize: string
    hoverBorderColor: string
    hoverColor: string
    placeholderColor: string
  }

  interface InputStatusData {
    borderColor: string
    focusBoxShadowColor: string
  }

  interface Label {
    color: string
    fontSize: string
    fontWeight: number
  }

  interface Notice extends Record<NoticeVariant, NoticeVariantData> {
    fontSize: string
  }

  interface NoticeVariantData {
    color: string
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
    warning: string
    warningContrast: string
    white: string
    whiteBis: string
    whiteTer: string
    yellow: string
    yellowContrast: string
  }
}
