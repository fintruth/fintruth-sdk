import React from 'react'
import { Field, FieldProps } from 'formik'
import InputField from 'components/input-field'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  isRequired?: boolean
  label?: string
  name: string
  placeholder?: string
  validate?: (value: any) => Promise<void> | string | undefined
}

interface Values {
  [key: string]: string
}

const ControlledInputField: React.FunctionComponent<Props> = ({
  name,
  validate,
  ...rest
}: Props) => (
  <Field name={name} validate={validate}>
    {(props: FieldProps<Values>) => {
      const { onBlur, onChange, value } = props.field
      const { errors, touched } = props.form

      return (
        <InputField
          name={name}
          {...rest}
          notice={touched[name] ? errors[name] : undefined}
          onBlur={onBlur}
          onChange={onChange}
          status={touched[name] && errors[name] ? 'invalid' : 'default'}
          value={value}
        />
      )
    }}
  </Field>
)

export default ControlledInputField
