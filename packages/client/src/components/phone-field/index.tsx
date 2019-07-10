import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import { Alpha2Code } from './data'

type Dispatch = (action: Action) => void

type Type = 'setLabelId' | 'setPlaceholder'

interface Action {
  type: Type
  payload: Payload
}

interface BaseState {
  placeholder: string
  labelId: string
}

interface Payload {
  placeholder?: string
  labelId?: string
}

export interface PhoneValue {
  alpha2Code: Alpha2Code
  number: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
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

const PhoneField: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { isDisabled = false, isRequired = true, name, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const [baseState, dispatch] = React.useReducer<
    React.Reducer<BaseState, Action>
  >(reducer, { labelId: '', placeholder: '' })
  const state = React.useMemo<State>(
    () => ({ ...baseState, isDisabled, isRequired, name }),
    [baseState, isDisabled, isRequired, name]
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root ref={ref} {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

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
export default React.forwardRef(PhoneField)
