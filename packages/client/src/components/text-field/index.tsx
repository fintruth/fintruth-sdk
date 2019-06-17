import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  isRequired?: boolean
  name: string
}

interface State {
  isRequired: boolean
  name: string
}

const StateContext = React.createContext<State | undefined>(undefined)

const Root = styled.div`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const TextField: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { isRequired = true, name, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const state = React.useMemo(() => ({ isRequired, name }), [isRequired, name])

  return (
    <StateContext.Provider value={state}>
      <Root ref={ref} {...props} />
    </StateContext.Provider>
  )
}

export const useTextFieldContext = () => {
  const state = React.useContext(StateContext)

  invariant(
    state,
    'Please ensure that you have called `TextField` higher up in your tree'
  )

  return state as State
}

export { default as TextFieldHelp } from './help'
export { default as TextFieldInput } from './input'
export { default as TextFieldLabel } from './label'
export default React.forwardRef(TextField)
