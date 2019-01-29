import React from 'react'
import styled from 'styled-components'
import { Form as BaseForm, Formik } from 'formik'
import { Link as BaseLink, RouteComponentProps } from '@reach/router'
import { MutationFn } from 'react-apollo'
import { object, string } from 'yup'
import { rem } from 'polished'
import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import ControlledInputField from 'components/controlled-input-field'
import { centered, link } from 'styles/mixins'

export interface Data {
  payload: Payload
}

interface Payload {
  error: any
}

interface Props extends RouteComponentProps {
  notice: null | string
  onSubmit: MutationFn<Data, Variables>
  status: string
}

interface Values {
  email: string
}

export interface Variables {
  input: Values
}

const Root = styled.div`
  ${centered};
  flex-direction: column;
  min-height: 100vh;
`

const Notice = styled(BaseNotice)`
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
  width: ${rem(280)};
`

const Button = styled(BaseButton)`
  align-self: center;
  margin-top: ${rem(40)};
`

const Disclaimer = styled.div`
  font-size: ${rem(12)};
  margin-top: ${rem(16)};
`

const Link = styled(BaseLink)`
  ${link};
`

const initialValues = { email: '' }

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
})

const formId = 'recover__Form'

const Recover: React.FunctionComponent<Props> = ({
  notice,
  onSubmit,
  status,
  ...rest
}: Props) => (
  <Root {...rest}>
    {notice && <Notice status={status}>{notice}</Notice>}
    <Formik<Values>
      initialValues={initialValues}
      onSubmit={input => onSubmit({ variables: { input } })}
      validationSchema={validationSchema}
    >
      {() => (
        <Form id={formId} noValidate>
          <ControlledInputField
            id={`${formId}-email`}
            autoComplete="off"
            form={formId}
            label="EMAIL"
            name="email"
            type="email"
          />
          <Disclaimer>
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </Disclaimer>
          <Button form={formId} status="primary" type="submit">
            RECOVER
          </Button>
        </Form>
      )}
    </Formik>
  </Root>
)

export default Recover
