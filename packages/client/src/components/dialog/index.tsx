import { DialogProps } from '@reach/dialog'
import React from 'react'

import DialogContent from './content'
import DialogOverlay, { useDialogOverlayContext } from './overlay'

export type Props = DialogProps

const Dialog = React.forwardRef<HTMLDivElement, Props>(function Dialog(
  { className, initialFocusRef, isOpen, onDismiss, ...props }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <DialogOverlay
      ref={ref}
      className={className}
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <DialogContent {...props} />
    </DialogOverlay>
  )
})

export { default as DialogClose } from './close'
export { DialogContent, DialogOverlay, useDialogOverlayContext }
export default Dialog
