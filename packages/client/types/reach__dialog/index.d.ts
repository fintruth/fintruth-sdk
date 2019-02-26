declare module '@reach/dialog' {
  import * as React from 'react'

  interface DialogProps {
    isOpen?: boolean
    onDismiss?: () => void
  }

  const Dialog: React.ComponentType<DialogProps>
}
