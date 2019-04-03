import { DefaultTheme, PartialDefaultTheme } from 'styled-components' // eslint-disable-line import/named
import { em, hsl, hsla, readableColor, rem } from 'polished'

export const createTheme = ({
  grayDarker = hsl(0, 0, 0.21),
  grayDark = hsl(0, 0, 0.29),
  gray = hsl(0, 0, 0.48),
  grayLight = hsl(0, 0, 0.71),
  grayLighter = hsl(0, 0, 0.86),

  whiteTer = hsl(0, 0, 0.96),
  white = hsl(0, 0, 1),

  orange = hsl(14, 1, 0.53),
  yellow = hsl(48, 1, 0.67),
  green = hsl(141, 0.71, 0.48),
  turquoise = hsl(171, 1, 0.41),
  cyan = hsl(204, 0.86, 0.53),
  blue = hsl(217, 0.71, 0.53),
  purple = hsl(271, 1, 0.71),
  red = hsl(348, 1, 0.61),

  backgroundColor = whiteTer,

  primaryColor = turquoise,
  infoColor = cyan,
  successColor = green,
  warningColor = yellow,
  dangerColor = red,

  readableDark = hsla(0, 0, 0, 0.7),
  readableLight = white,

  blueInvert = readableColor(blue, readableDark, readableLight),

  textColor = grayDark,
  textStrongColor = grayDarker,

  gap = 64,

  fontFamilyMonospace = 'monospace',
  fontFamilySansSerif = 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',

  fontFamilyPrimary = fontFamilySansSerif,
  fontFamilyCode = fontFamilyMonospace,

  fontSize4 = rem(24),
  fontSize5 = rem(20),
  fontSize6 = rem(16),
  fontSize7 = rem(12),

  fontWeightNormal = 400,
  fontWeightBold = 700,

  textRendering = 'optimizeLegibility',

  body = {},
  code = {},
  hr = {},
  html = {},
  pre = {},
  strong = {},

  ...rest
}: PartialDefaultTheme = {}): DefaultTheme => ({
  // General Colors
  black: hsl(0, 0, 0.04),
  blackBis: hsl(0, 0, 0.07),
  blackTer: hsl(0, 0, 0.14),

  grayDarker,
  grayDark,
  gray,
  grayLight,
  grayLighter,

  whiteTer,
  whiteBis: hsl(0, 0, 0.98),
  white,

  orange,
  yellow,
  green,
  turquoise,
  cyan,
  blue,
  purple,
  red,

  backgroundColor,

  borderColor: grayLighter,
  borderHoverColor: grayLight,

  // Main Colors
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,

  // Readability Colors
  readableDark,
  readableLight,

  // Invert Colors
  orangeInvert: readableColor(orange, readableDark, readableLight),
  yellowInvert: readableColor(yellow, readableDark, readableLight),
  greenInvert: readableColor(green, readableDark, readableLight),
  turquoiseInvert: readableColor(turquoise, readableDark, readableLight),
  cyanInvert: readableColor(cyan, readableDark, readableLight),
  blueInvert,
  purpleInvert: readableColor(purple, readableDark, readableLight),
  redInvert: readableColor(red, readableDark, readableLight),

  primaryInvertColor: readableColor(primaryColor, readableDark, readableLight),
  infoInvertColor: readableColor(infoColor, readableDark, readableLight),
  successInvertColor: readableColor(successColor, readableDark, readableLight),
  warningInvertColor: readableColor(warningColor, readableDark, readableLight),
  dangerInvertColor: readableColor(dangerColor, readableDark, readableLight),

  // Link Colors
  linkColor: blue,
  linkInvertColor: blueInvert,
  linkVisitedColor: purple,

  linkHoverColor: grayDarker,
  linkHoverBorderColor: grayLight,

  linkFocusColor: grayDarker,
  linkFocusBorderColor: blue,

  linkActiveColor: grayDarker,
  linkActiveBorderColor: grayDark,

  // Text Colors
  textColor,
  textInvertColor: readableColor(textColor, readableDark, readableLight),
  textLightColor: gray,
  textStrongColor,
  textSelectionColor: hsl(213, 0.92, 0.85),

  // Responsiveness
  gap,

  viewportSmall: 769,
  viewportMedium: 960 + 2 * gap,
  viewportLarge: 1152 + 2 * gap,
  viewportExtraLarge: 1344 + 2 * gap,

  // Typography
  fontFamilyMonospace,
  fontFamilySansSerif,

  fontFamilyPrimary,
  fontFamilySecondary: fontFamilySansSerif,
  fontFamilyCode,

  fontSize1: rem(48),
  fontSize2: rem(40),
  fontSize3: rem(32),
  fontSize4,
  fontSize5,
  fontSize6,
  fontSize7,

  fontSizeSmall: fontSize7,
  fontSizeNormal: fontSize6,
  fontSizeMedium: fontSize5,
  fontSizeLarge: fontSize4,

  fontWeightLight: 300,
  fontWeightNormal,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold,

  textRendering,

  body: {
    // Colors
    color: textColor,

    // Typography
    fontFamily: fontFamilyPrimary,
    fontWeight: fontWeightNormal,
    lineHeight: 1.4,

    ...body,
  },

  code: {
    // Colors
    backgroundColor,
    color: red,

    // Typography
    fontFamily: fontFamilyCode,
    fontSize: `${em(14)}`,
    fontWeight: fontWeightNormal,

    // Miscellaneous
    padding: `${em(4)} ${em(8)}`,

    ...code,
  },

  hr: {
    // Colors
    backgroundColor,

    // Miscellaneous
    height: '2px',
    margin: `${rem(24)} 0`,

    ...hr,
  },

  html: {
    // Colors
    backgroundColor: white,

    // Typography
    fontSize: `${em(16)}`,
    textRendering,

    // Miscellaneous
    overflowX: 'hidden',
    overflowY: 'scroll',

    ...html,
  },

  pre: {
    // Colors
    backgroundColor,
    color: textColor,

    ...pre,
  },

  strong: {
    // Colors
    color: textStrongColor,

    // Typography
    fontWeight: fontWeightBold,

    ...strong,
  },

  ...rest,
})
