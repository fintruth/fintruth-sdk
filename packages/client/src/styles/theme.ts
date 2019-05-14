import { hsl } from 'polished'
import { DefaultTheme } from 'styled-components' // eslint-disable-line import/named

import { readableColor } from 'utilities/style'

const grayDarker = hsl(0, 0, 0.21)
const grayDark = hsl(0, 0, 0.29)
const gray = hsl(0, 0, 0.48)
const grayLight = hsl(0, 0, 0.71)
const grayLighter = hsl(0, 0, 0.86)

const whiteTer = hsl(0, 0, 0.96)
const white = hsl(0, 0, 1)

const orange = hsl(14, 1, 0.53)
const yellow = hsl(48, 1, 0.67)
const green = hsl(141, 0.71, 0.48)
const turquoise = hsl(171, 1, 0.41)
const cyan = hsl(204, 0.86, 0.53)
const blue = hsl(217, 0.71, 0.53)
const purple = hsl(271, 1, 0.71)
const red = hsl(348, 1, 0.61)

const primary = turquoise
const info = cyan
const success = green
const warning = yellow
const danger = red

const blueContrast = readableColor(blue)

const textColor = grayDark

const gap = 64

const fontFamilyMonospace = 'monospace'
const fontFamilySansSerif =
  'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'

const theme: DefaultTheme = {
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

  primary,
  info,
  success,
  warning,
  danger,

  orangeContrast: readableColor(orange),
  yellowContrast: readableColor(yellow),
  greenContrast: readableColor(green),
  turquoiseContrast: readableColor(turquoise),
  cyanContrast: readableColor(cyan),
  blueContrast,
  purpleContrast: readableColor(purple),
  redContrast: readableColor(red),

  primaryContrast: readableColor(primary),
  infoContrast: readableColor(info),
  successContrast: readableColor(success),
  warningContrast: readableColor(warning),
  dangerContrast: readableColor(danger),

  backgroundColor: whiteTer,

  borderColor: grayLighter,
  borderHoverColor: grayLight,

  borderRadius: '4px',
  borderRadiusRounded: '999999px',

  textColor,
  textColorContrast: readableColor(textColor),
  textLightColor: gray,
  textStrongColor: grayDarker,
  textSelectionColor: hsl(213, 0.92, 0.85),

  linkColor: blue,
  linkColorContrast: blueContrast,
  linkVisitedColor: purple,

  linkHoverColor: grayDarker,
  linkHoverBorderColor: grayLight,

  linkFocusColor: grayDarker,
  linkFocusBorderColor: blue,

  linkActiveColor: grayDarker,
  linkActiveBorderColor: grayDark,

  gap,

  fontFamilyMonospace,
  fontFamilySansSerif,

  fontFamilyPrimary: fontFamilySansSerif,
  fontFamilySecondary: fontFamilySansSerif,
  fontFamilyCode: fontFamilyMonospace,

  textRendering: 'optimizeLegibility',

  viewport: {
    small: 769,
    medium: 960 + 2 * gap,
    large: 1152 + 2 * gap,
    extraLarge: 1344 + 2 * gap,
  },
}

export default theme
