declare module '@reach/tooltip' {
  import {
    CSSProperties,
    FocusEventHandler,
    ForwardRefExoticComponent,
    FunctionComponent,
    HTMLAttributes,
    KeyboardEventHandler,
    MouseEventHandler,
    PropsWithoutRef,
    ReactChild,
    ReactElement,
    ReactFragment,
    ReactNode,
    ReactNodeArray,
    ReactPortal,
    Ref,
    RefAttributes,
  } from 'react'

  interface TriggerProps
    extends Required<Omit<TooltipAttributes, 'DEBUG_STYLE'>> {
    'aria-describedby': string
    'data-reach-tooltip-trigger': string
  }

  interface TooltipAttributes {
    DEBUG_STYLE?: boolean
    onBlur?: FocusEventHandler<any>
    onFocus?: FocusEventHandler<any>
    onKeyDown?: KeyboardEventHandler<any>
    onMouseDown?: MouseEventHandler<any>
    onMouseEnter?: MouseEventHandler<any>
    onMouseLeave?: MouseEventHandler<any>
    onMouseMove?: MouseEventHandler<any>
    ref?: Ref<any>
  }

  interface TooltipMetaProps {
    id: string
    triggerRect: DOMRect
    isVisible: boolean
  }

  export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    ariaLabel?: string
    children: ReactElement | ReactNodeArray | ReactPortal
    label: ReactNode
  }

  export interface TooltipPopupProps extends Omit<TooltipProps, 'children'> {
    position?: (rectA: DOMRect, rectB: DOMRect) => CSSProperties
  }

  export function useTooltip(
    attrs?: TooltipAttributes
  ): [TriggerProps, TooltipMetaProps, boolean]

  const Tooltip: FunctionComponent<TooltipProps>
  export const TooltipPopup: ForwardRefExoticComponent<
    PropsWithoutRef<TooltipPopupProps> & RefAttributes<HTMLDivElement>
  >

  export default Tooltip
}
