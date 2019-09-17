import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled from 'styled-components'

import { useFileFieldContext } from '.'

type Props = React.LabelHTMLAttributes<HTMLLabelElement>

const Root = styled.label`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Label: React.RefForwardingComponent<HTMLLabelElement, Props> = (
  { id, ...props }: Props,
  ref?: React.Ref<HTMLLabelElement>
) => {
  const [{ labelId, name }, dispatch] = useFileFieldContext()
  const seed = useUIDSeed()

  React.useEffect(
    () =>
      dispatch({ payload: { labelId: id || seed(name) }, type: 'setLabelId' }),
    [dispatch, id, name, seed]
  )

  return <Root id={labelId} data-file-field-label="" ref={ref} {...props} />
}

export default React.forwardRef(Label)
