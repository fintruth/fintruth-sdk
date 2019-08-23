import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

type Dispatch = (action: Action) => void

type Type = 'setLabelId'

interface Action {
  payload: Payload
  type: Type
}

interface BaseState {
  labelId: string
}

interface Payload {
  labelId?: string
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
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const Root = styled.div`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const Field: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { isDisabled = false, isRequired = true, name, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const [baseState, dispatch] = React.useReducer<
    React.Reducer<BaseState, Action>
  >(reducer, { labelId: '' })
  const state = React.useMemo<State>(
    () => ({ ...baseState, isDisabled, isRequired, name }),
    [baseState, isDisabled, isRequired, name]
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root data-field ref={ref} {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useFieldContext = (): [State, Dispatch] => {
  const dispatch = React.useContext<Dispatch | undefined>(DispatchContext)
  const state = React.useContext<State | undefined>(StateContext)

  invariant(
    dispatch || state,
    'Please ensure that you have called `Field` higher up in your tree'
  )

  return [state as State, dispatch as Dispatch]
}

export { default as FieldCountrySelect } from './country-select'
export { default as FieldHelp } from './help'
export { default as FieldInput } from './input'
export { default as FieldLabel } from './label'
export { default as FieldSelect } from './select'
export default React.forwardRef(Field)
