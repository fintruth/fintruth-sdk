import React from 'react'
import { useField } from 'formik'

import InputField from 'components/input-field'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  isRequired?: boolean
  label?: string
  name: string
}

const ControlledInputField: React.FunctionComponent<Props> = ({
  name,
  ...props
}: Props) => {
  const [field, { error, touched }] = useField(name)

  return (
    <InputField
      {...field}
      notice={touched ? error : undefined}
      status={error && touched ? 'failure' : 'default'}
      {...props}
    />
  )
}

export default ControlledInputField
