import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

import data from './data'

type Dispatch = (action: Action) => void

interface Action {
  type: 'setPlaceholder'
  value: string
}

export interface PhoneValue {
  alpha2Code: typeof data[number]['alpha2Code']
  callingCode: typeof data[number]['callingCode']
  countryName: typeof data[number]['countryName']
  number: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  isRequired?: boolean
  name: string
}

interface State {
  isRequired: boolean
  name: string
  placeholder: string
}

const DispatchContext = React.createContext<Dispatch | undefined>(undefined)
const StateContext = React.createContext<State | undefined>(undefined)

const reducer = (state: State, { type, value }: Action) => {
  switch (type) {
    case 'setPlaceholder':
      return { ...state, placeholder: value }
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
  { isRequired = true, name, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const [state, dispatch] = React.useReducer(reducer, {
    isRequired,
    name,
    placeholder: '',
  })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root ref={ref} {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const usePhoneFieldContext = (): [State, Dispatch] => {
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)

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
