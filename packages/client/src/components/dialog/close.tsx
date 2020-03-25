import React from 'react'
import styled from 'styled-components'

import { close } from 'styles/mixins'
import { useDialogOverlayContext } from './overlay'

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  onDismiss?: (
    event?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => void
}

const Root = styled.button`
  ${close('large')}
  background: none;
  height: 40px;
  position: fixed;
  right: 20px;
  top: 20px;
  width: 40px;
`

const Close = React.forwardRef<HTMLButtonElement, Props>(function Close(
  { onClick, onDismiss: providedOnDismiss, ...props }: Props,
  ref?: React.Ref<HTMLButtonElement>
) {
  const { onDismiss } = useDialogOverlayContext()[0]

  return (
    <Root
      data-dialog-close=""
      onClick={(event) => {
        if (onClick) {
          onClick(event)
        }

        return providedOnDismiss ? providedOnDismiss(event) : onDismiss(event)
      }}
      ref={ref}
      {...props}
    />
  )
})

export default Close
