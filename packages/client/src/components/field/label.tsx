import { rem } from 'polished'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled from 'styled-components'

import BaseLabel, { Props as LabelProps } from 'components/label'
import { useFieldContext } from '.'

type Props = Omit<LabelProps, 'isRequired'>

const Root = styled(BaseLabel)`
  font-size: inherit;

  &:not(:last-child) {
    margin-bottom: ${rem(8)};
  }
`

const Label: React.RefForwardingComponent<HTMLLabelElement, Props> = (
  { id, ...props }: Props,
  ref?: React.Ref<HTMLLabelElement>
) => {
  const [{ isRequired, labelId, name }, dispatch] = useFieldContext()
  const seed = useUIDSeed()

  React.useEffect(
    () =>
      dispatch({ payload: { labelId: id || seed(name) }, type: 'setLabelId' }),
    [dispatch, id, name, seed]
  )

  return (
    <Root
      id={labelId}
      data-field-label
      isRequired={isRequired}
      ref={ref}
      {...props}
    />
  )
}

export default React.forwardRef(Label)
