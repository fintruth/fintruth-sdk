import { DeepPartial } from '@fintruth-sdk/shared'
import { em, getLuminance, hsl, hsla, rem, transparentize } from 'polished'
import { DefaultTheme } from 'styled-components' // eslint-disable-line import/named

export const readableColor = (
  color: string,
  lightReturnColor: string = '#000',
  darkReturnColor: string = '#fff'
) => (getLuminance(color) > 0.55 ? lightReturnColor : darkReturnColor)

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

  primary,
  info,
  success,
  warning,
  danger,

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

  linkColor,
  linkColorContrast: blueContrast,
  linkVisitedColor: purple,

  linkHoverColor: grayDarker,
  linkHoverBorderColor: grayLight,

  linkFocusColor: grayDarker,
  linkFocusBorderColor: blue,

  linkActiveColor: grayDarker,
  linkActiveBorderColor: grayDark,

  textColor,
  textColorContrast: readableColor(textColor, lightContrast, darkContrast),
  textLightColor,
  textStrongColor,
  textSelectionColor: hsl(213, 0.92, 0.85),

  gap,

  fontFamilyMonospace,
  fontFamilySansSerif,

  fontFamilyPrimary,
  fontFamilySecondary: fontFamilySansSerif,
  fontFamilyCode,

  textRendering,

  body: {
    fontFamily: fontFamilyPrimary,
    color: textColor,
    fontWeight: 400,
    lineHeight: 1.4,
    ...body,
  },

  code: {
    color: red,
    backgroundColor,

    fontFamily: fontFamilyCode,
    padding: `${em(4)} ${em(8)}`,
    fontWeight: 400,
    fontSize: em(14),
    ...code,
  },

  control: {
    borderRadius: '4px',

    borderWidth: controlBorderWidth,

    fontSize: rem(16),
    height: em(36),
    lineHeight: 1.5,

    paddingVertical: `calc(${em(6)} - ${controlBorderWidth})`,
    paddingHorizontal: `calc(${em(10)} - ${controlBorderWidth})`,
    ...control,
  },

  file: {
    borderColor,
    borderRadius: '4px',

    ctaColor: grayDark,
    ctaBackgroundColor: whiteTer,
    ctaHoverColor: grayDarker,
    ctaActiveColor: grayDarker,

    nameBorderColor: borderColor,
    nameBorderStyle: 'solid',
    nameBorderWidth: '1px 1px 1px 0',
    ...file,
  },

  hr: {
    backgroundColor,
    height: '2px',
    margin: `${rem(24)} 0`,
    ...hr,
  },

  html: {
    backgroundColor: white,
    fontSize: em(16),
    textRendering,
    overflowX: 'hidden',
    overflowY: 'scroll',
    ...html,
  },

  input: {
    color: inputColor,
    backgroundColor: white,
    boxShadow: `inset 0 1px 2px ${transparentize(0.9, black)}`,
    placeholderColor: transparentize(0.7, inputColor),

    hoverColor: inputHoverColor,
    hoverBorderColor: grayLight,

    focusBorderColor: linkColor,
    focusBoxShadowSize: `0 0 0 ${em(2)}`,

    disabledColor: inputDisabledColor,
    disabledBackgroundColor: backgroundColor,
    disabledBorderColor: backgroundColor,
    disabledPlaceholderColor: transparentize(0.7, inputDisabledColor),

    borderRadius: '4px',
    ...input,

    default: {
      borderColor: grayLighter,

      focusBoxShadowColor: transparentize(0.75, linkColor),
      ...(input.default || {}),
    },

    danger: {
      borderColor: danger,

      focusBoxShadowColor: transparentize(0.75, danger),
      ...(input.danger || {}),
    },
  },

  label: {
    color: grayDarker,
    fontSize: rem(16),
    fontWeight: 700,
    ...label,
  },

  notice: {
    fontSize: rem(12),
    ...notice,

    default: {
      color: textColor,
      ...(notice.default || {}),
    },

    success: {
      color: success,
      ...(notice.success || {}),
    },

    danger: {
      color: danger,
      ...(notice.danger || {}),
    },
  },

  pre: {
    color: textColor,
    backgroundColor,
    ...pre,
  },

  radio: {
    hoverColor: inputHoverColor,

    disabledColor: inputDisabledColor,

    toggleColor: textColor,
    toggleCheckedColor: blue,

    toggleDisabledColor: inputDisabledColor,
    ...radio,
  },

  strong: {
    color: textStrongColor,
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
