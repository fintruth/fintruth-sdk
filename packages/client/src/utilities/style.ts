import {
  Body, // eslint-disable-line import/named
  Code, // eslint-disable-line import/named
  DefaultTheme, // eslint-disable-line import/named
  Hr, // eslint-disable-line import/named
  Pre, // eslint-disable-line import/named
  Html, // eslint-disable-line import/named
  Strong, // eslint-disable-line import/named
  Variables, // eslint-disable-line import/named
} from 'styled-components'
import { em, hsl, hsla, readableColor, rem } from 'polished'

export interface PartialDefaultTheme extends Partial<Variables> {
  body?: Partial<Body>
  code?: Partial<Code>
  hr?: Partial<Hr>
  html?: Partial<Html>
  pre?: Partial<Pre>
  strong?: Partial<Strong>
}

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

  primary = turquoise,
  info = cyan,
  success = green,
  warning = yellow,
  danger = red,

  darkContrast = white,
  lightContrast = hsla(0, 0, 0, 0.7),

  blueContrast = readableColor(blue, lightContrast, darkContrast),

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
  primary,
  info,
  success,
  warning,
  danger,

  // Contrast Colors
  darkContrast,
  lightContrast,

  orangeContrast: readableColor(orange, lightContrast, darkContrast),
  yellowContrast: readableColor(yellow, lightContrast, darkContrast),
  greenContrast: readableColor(green, lightContrast, darkContrast),
  turquoiseContrast: readableColor(turquoise, lightContrast, darkContrast),
  cyanContrast: readableColor(cyan, lightContrast, darkContrast),
  blueContrast,
  purpleContrast: readableColor(purple, lightContrast, darkContrast),
  redContrast: readableColor(red, lightContrast, darkContrast),

  primaryContrast: readableColor(primary, lightContrast, darkContrast),
  infoContrast: readableColor(info, lightContrast, darkContrast),
  successContrast: readableColor(success, lightContrast, darkContrast),
  warningContrast: readableColor(warning, lightContrast, darkContrast),
  dangerContrast: readableColor(danger, lightContrast, darkContrast),

  // Link Colors
  linkColor: blue,
  linkColorContrast: blueContrast,
  linkVisitedColor: purple,

  linkHoverColor: grayDarker,
  linkHoverBorderColor: grayLight,

  linkFocusColor: grayDarker,
  linkFocusBorderColor: blue,

  linkActiveColor: grayDarker,
  linkActiveBorderColor: grayDark,

  // Text Colors
  textColor,
  textColorContrast: readableColor(textColor, lightContrast, darkContrast),
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

  textRendering,

  body: {
    // Colors
    color: textColor,

    // Typography
    fontFamily: fontFamilyPrimary,
    fontWeight: 400,
    lineHeight: 1.4,

    ...body,
  },

  code: {
    // Box
    padding: `${em(4)} ${em(8)}`,

    // Colors
    backgroundColor,
    color: red,

    // Typography
    fontFamily: fontFamilyCode,
    fontSize: `${em(14)}`,
    fontWeight: 400,

    ...code,
  },

  hr: {
    // Box
    height: '2px',
    margin: `${rem(24)} 0`,

    // Colors
    backgroundColor,

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
    fontWeight: 700,

    ...strong,
  },

  ...rest,
})
