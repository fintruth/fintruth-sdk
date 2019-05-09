import { DeepPartial } from '@fintruth-sdk/shared'
import { em, hsl, hsla, readableColor, rem, transparentize } from 'polished'
import { DefaultTheme } from 'styled-components' // eslint-disable-line import/named

export const createTheme = ({
  black = hsl(0, 0, 0.04),

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

  borderColor = grayLighter,

  primary = turquoise,
  info = cyan,
  success = green,
  warning = yellow,
  danger = red,

  darkContrast = white,
  lightContrast = hsla(0, 0, 0, 0.7),

  blueContrast = readableColor(blue, lightContrast, darkContrast),

  linkColor = blue,

  textColor = grayDark,
  textLightColor = gray,
  textStrongColor = grayDarker,

  gap = 64,

  fontFamilyMonospace = 'monospace',
  fontFamilySansSerif = 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',

  fontFamilyPrimary = fontFamilySansSerif,
  fontFamilyCode = fontFamilyMonospace,

  textRendering = 'optimizeLegibility',

  body = {},
  code = {},
  control: { borderWidth: controlBorderWidth = '1px', ...control } = {},
  file = {},
  hr = {},
  html = {},
  input: {
    color: inputColor = grayDarker,
    disabledColor: inputDisabledColor = textLightColor,
    hoverColor: inputHoverColor = grayDarker,
    ...input
  } = {},
  label = {},
  notice = {},
  pre = {},
  radio = {},
  strong = {},

  viewport = {},
  ...defaultTheme
}: DeepPartial<DefaultTheme> = {}): DefaultTheme => ({
  // General Colors
  black,
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

  borderColor,
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
  linkColor,
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
  textLightColor,
  textStrongColor,
  textSelectionColor: hsl(213, 0.92, 0.85),

  // Responsiveness
  gap,

  // Typography
  fontFamilyMonospace,
  fontFamilySansSerif,

  fontFamilyPrimary,
  fontFamilySecondary: fontFamilySansSerif,
  fontFamilyCode,

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
    fontSize: em(14),
    fontWeight: 400,

    ...code,
  },

  control: {
    // Box
    borderWidth: controlBorderWidth,
    height: em(36),
    paddingHorizontal: `calc(${em(10)} - ${controlBorderWidth})`,
    paddingVertical: `calc(${em(6)} - ${controlBorderWidth})`,

    // Typography
    lineHeight: 1.5,
    fontSize: rem(16),

    // Miscellaneous
    borderRadius: '4px',

    ...control,
  },

  file: {
    // Box
    nameBorderStyle: 'solid',
    nameBorderWidth: '1px 1px 1px 0',

    // Colors
    borderColor,

    ctaActiveColor: grayDarker,
    ctaBackgroundColor: whiteTer,
    ctaColor: grayDark,
    ctaHoverColor: grayDarker,

    nameBorderColor: borderColor,

    // Miscellaneous
    borderRadius: '4px',

    ...file,
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
    fontSize: em(16),
    textRendering,

    // Miscellaneous
    overflowX: 'hidden',
    overflowY: 'scroll',

    ...html,
  },

  input: {
    // Colors
    backgroundColor: white,
    boxShadow: `inset 0 1px 2px ${transparentize(0.9, black)}`,
    color: inputColor,

    placeholderColor: transparentize(0.7, inputColor),

    disabledBackgroundColor: backgroundColor,
    disabledBorderColor: backgroundColor,
    disabledColor: inputDisabledColor,

    disabledPlaceholderColor: transparentize(0.7, inputDisabledColor),

    focusBorderColor: linkColor,
    focusBoxShadowSize: `0 0 0 ${em(2)}`,

    hoverBorderColor: grayLight,
    hoverColor: inputHoverColor,

    // Miscellaneous
    borderRadius: '4px',

    ...input,

    default: {
      // Colors
      borderColor: grayLighter,

      focusBoxShadowColor: transparentize(0.75, linkColor),

      ...(input.default || {}),
    },

    danger: {
      // Colors
      borderColor: danger,

      focusBoxShadowColor: transparentize(0.75, danger),

      ...(input.danger || {}),
    },
  },

  label: {
    // Colors
    color: grayDarker,

    // Typography
    fontSize: rem(16),
    fontWeight: 700,

    ...label,
  },

  notice: {
    // Typography
    fontSize: rem(12),

    ...notice,

    default: {
      // Colors
      color: textColor,

      ...(notice.default || {}),
    },

    danger: {
      // Colors
      color: danger,

      ...(notice.danger || {}),
    },

    success: {
      // Colors
      color: success,

      ...(notice.success || {}),
    },
  },

  pre: {
    // Colors
    backgroundColor,
    color: textColor,

    ...pre,
  },

  radio: {
    // Colors
    disabledColor: inputDisabledColor,
    hoverColor: inputHoverColor,

    toggleCheckedColor: blue,
    toggleColor: textColor,
    toggleDisabledColor: inputDisabledColor,

    ...radio,
  },

  strong: {
    // Colors
    color: textStrongColor,

    // Typography
    fontWeight: 700,

    ...strong,
  },

  viewport: {
    small: 769,
    medium: 960 + 2 * gap,
    large: 1152 + 2 * gap,
    extraLarge: 1344 + 2 * gap,
    ...viewport,
  },
  ...defaultTheme,
})
