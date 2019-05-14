import { getLuminance, hsl, hsla } from 'polished'

export const readableColor = (
  color: string,
  lightReturnColor: string = hsla(0, 0, 0, 0.7),
  darkReturnColor: string = hsl(0, 0, 1)
) => (getLuminance(color) > 0.55 ? lightReturnColor : darkReturnColor)
