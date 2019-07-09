import { FormikFormProps } from 'formik'

declare module 'formik' {
  export type Validate = (value: any) => string | Promise<void> | undefined

  export function Form(props: FormikFormProps): JSX.Element
}
