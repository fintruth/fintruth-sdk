import invariant from 'invariant'
import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

type Dispatch = (action: Action) => void

type Type = 'setLabelId'

export type Variant = 'danger' | 'primary'

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
  fileName?: string
  isDisabled?: boolean
  isRequired?: boolean
  name: string
}

interface State extends BaseState {
  fileName: string
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

const FileField: React.RefForwardingComponent<HTMLDivElement, Props> = (
  {
    fileName = '',
    isDisabled = false,
    isRequired = true,
    name,
    ...props
  }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  const [baseState, dispatch] = React.useReducer<
    React.Reducer<BaseState, Action>
  >(reducer, { labelId: '' })
  const state = React.useMemo<State>(
    () => ({ ...baseState, fileName, isDisabled, isRequired, name }),
    [baseState, fileName, isDisabled, isRequired, name]
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Root data-file-field ref={ref} {...props} />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useFileFieldContext = (): [State, Dispatch] => {
  const dispatch = React.useContext<Dispatch | undefined>(DispatchContext)
  const state = React.useContext<State | undefined>(StateContext)

  invariant(
    dispatch || state,
    'Please ensure that you have called `FileField` higher up in your tree'
  )

  return [state as State, dispatch as Dispatch]
}

export { default as FileFieldCallToAction } from './call-to-action'
export { default as FileFieldHelp } from './help'
export { default as FileFieldIcon } from './icon'
export * from './mixins'
export { default as FileFieldName } from './name'
export { default as FileFieldLabel } from './label'
export default React.forwardRef(FileField)
