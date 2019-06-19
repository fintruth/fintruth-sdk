import 'formik'

declare module 'formik' {
  export type Validate = (value: any) => string | Promise<void> | undefined
}
