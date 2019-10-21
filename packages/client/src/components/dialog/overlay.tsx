import { DialogOverlay, DialogOverlayProps } from '@reach/dialog'
import styles from '@reach/dialog/styles.css'
import invariant from 'invariant'
import useStyles from 'isomorphic-style-loader/useStyles'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { overlay } from 'styles/mixins'

type Dispatch = (action: Action) => void

type Payload = Partial<State>

type Props = DialogOverlayProps

type Type = 'setOnDismiss'

interface Action {
  payload: Payload
  type: Type
}

interface State {
  onDismiss: (
    event?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => void
}

const DispatchContext = React.createContext<Dispatch | undefined>(undefined)
const StateContext = React.createContext<State | undefined>(undefined)

const noop = () => {}

const reducer = (prevState: State, { type, payload }: Action) => {
  switch (type) {
    case 'setOnDismiss':
      return {
        ...prevState,
        onDismiss: payload.onDismiss || prevState.onDismiss,
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const Root = styled(DialogOverlay)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &[data-dialog-overlay] {
    ${overlay()}
    background-color: ${({ theme }) => transparentize(0.14, theme.black)};
    overflow: auto;
    position: fixed;
  }
`

const Overlay = React.forwardRef<HTMLDivElement, Props>(function Overlay(
  { onDismiss = noop, ...props }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    reducer,
    { onDismiss }
  )

  useStyles(styles)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root
          data-dialog-overlay=""
          onDismiss={onDismiss}
          ref={ref}
          {...props}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
})

export const useDialogOverlayContext = (): [State, Dispatch] => {
  const dispatch = React.useContext<Dispatch | undefined>(DispatchContext)
  const state = React.useContext<State | undefined>(StateContext)

  invariant(
    dispatch || state,
    'Please ensure that you have called `DialogOverlay` higher up in your tree'
  )

  return [state as State, dispatch as Dispatch]
}

export default Overlay
