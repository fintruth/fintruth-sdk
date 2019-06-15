import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  isRequired?: boolean
  name: string
}

interface Context {
  isRequired?: boolean
  name: string
}

const Context = React.createContext<Context | undefined>(undefined)

const Root = styled.div`
  &:not(:last-child) {
    margin-bottom: ${rem(12)};
  }
`

const TextField: React.RefForwardingComponent<HTMLDivElement, Props> = (
  { isRequired = true, name, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const context = React.useMemo(() => ({ isRequired, name }), [
    isRequired,
    name,
  ])

  return (
    <Context.Provider value={context}>
      <Root ref={ref} {...props} />
    </Context.Provider>
  )
}

export const useTextFieldContext = () => {
  const context = React.useContext(Context)

  invariant(
    context,
    'Please ensure that you have called `TextField` higher up in your tree'
  )

  return context as Context
}

export { default as TextFieldHelp } from './help'
export { default as TextFieldInput } from './input'
export { default as TextFieldLabel } from './label'
export default React.forwardRef(TextField)
