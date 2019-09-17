import invariant from 'invariant'
import { em } from 'polished'
import React from 'react'
import styled from 'styled-components'

type Dispatch = (action: Action) => void

type Payload = Partial<BaseState>

type Type = 'setInputId'

interface Action {
  payload: Payload
  type: Type
}

interface BaseState {
  inputId: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean
  name: string
}

interface State extends BaseState {
  isDisabled: boolean
  name: string
}

const DispatchContext = React.createContext<Dispatch | undefined>(undefined)
const StateContext = React.createContext<State | undefined>(undefined)

const reducer = (prevState: BaseState, { type, payload }: Action) => {
  switch (type) {
    case 'setInputId':
      return { ...prevState, inputId: payload.inputId || '' }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const Root = styled.div`
  display: inline-block;
  line-height: 1.25;
  position: relative;

  & + & {
    margin-left: ${em(8)};
  }
`

const Radio: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { isDisabled = false, name, ...props }: Props,
  ref?: React.Ref<HTMLDivElement>
) => {
  const [baseState, dispatch] = React.useReducer<
    React.Reducer<BaseState, Action>
  >(reducer, { inputId: '' })
  const state = React.useMemo<State>(
    () => ({ ...baseState, isDisabled, name }),
    [baseState, isDisabled, name]
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root data-radio="" ref={ref} {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useRadioContext = (): [State, Dispatch] => {
  const dispatch = React.useContext<Dispatch | undefined>(DispatchContext)
  const state = React.useContext<State | undefined>(StateContext)

  invariant(
    dispatch || state,
    'Please ensure that you have called `Radio` higher up in your tree'
  )

  return [state as State, dispatch as Dispatch]
}

export { default as RadioInput } from './input'
export { default as RadioLabel } from './label'
export default React.forwardRef(Radio)
