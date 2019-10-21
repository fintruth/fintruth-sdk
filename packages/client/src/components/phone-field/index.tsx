import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { Alpha2Code } from 'translations'

type Dispatch = (action: Action) => void

type Payload = Partial<BaseState>

type Type = 'setControlId' | 'setLabelId' | 'setPlaceholder'

interface Action {
  payload: Payload
  type: Type
}

interface BaseState {
  controlId: string
  labelId: string
  placeholder: string
}

export interface PhoneValue {
  alpha2Code: Alpha2Code
  number: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean
  isRequired?: boolean
  name: string
}

interface State extends BaseState {
  isDisabled: boolean
  isRequired: boolean
  name: string
}

const DispatchContext = React.createContext<Dispatch | undefined>(undefined)
const StateContext = React.createContext<State | undefined>(undefined)

const reducer = (prevState: BaseState, { type, payload }: Action) => {
  switch (type) {
    case 'setControlId':
      return { ...prevState, controlId: payload.controlId || '' }
    case 'setLabelId':
      return { ...prevState, labelId: payload.labelId || '' }
    case 'setPlaceholder':
      return { ...prevState, placeholder: payload.placeholder || '' }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const Root = styled.div`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const PhoneField = React.forwardRef<HTMLDivElement, Props>(function PhoneField(
  { isDisabled = false, isRequired = true, name, ...props }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  const [baseState, dispatch] = React.useReducer<
    React.Reducer<BaseState, Action>
  >(reducer, { controlId: '', labelId: '', placeholder: '' })
  const state = React.useMemo<State>(
    () => ({ ...baseState, isDisabled, isRequired, name }),
    [baseState, isDisabled, isRequired, name]
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root data-phone-field="" ref={ref} {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
})

export const usePhoneFieldContext = (): [State, Dispatch] => {
  const dispatch = React.useContext<Dispatch | undefined>(DispatchContext)
  const state = React.useContext<State | undefined>(StateContext)

  invariant(
    dispatch || state,
    'Please ensure that you have called `PhoneField` higher up in your tree'
  )

  return [state as State, dispatch as Dispatch]
}

export { default as PhoneFieldHelp } from './help'
export { default as PhoneFieldInput } from './input'
export { default as PhoneFieldLabel } from './label'
export { default as PhoneFieldSelect } from './select'
export default PhoneField
