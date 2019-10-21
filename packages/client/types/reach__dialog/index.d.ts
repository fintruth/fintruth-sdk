declare module '@reach/dialog' {
  import {
    EventHandler,
    ForwardRefExoticComponent,
    HTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
    RefObject,
  } from 'react'

  export type DialogContentProps = HTMLAttributes<HTMLDivElement>

  export type DialogOverlayProps = DialogProps

  export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    initialFocusRef?: RefObject<HTMLElement>
    isOpen?: boolean
    onDismiss?: (
      event?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
    ) => void
  }

  export const Dialog: ForwardRefExoticComponent<
    PropsWithoutRef<DialogProps> & RefAttributes<HTMLDivElement>
  >
  export const DialogContent: ForwardRefExoticComponent<
    PropsWithoutRef<DialogContentProps> & RefAttributes<HTMLDivElement>
  >
  export const DialogOverlay: ForwardRefExoticComponent<
    PropsWithoutRef<DialogOverlayProps> & RefAttributes<HTMLDivElement>
  >
}
