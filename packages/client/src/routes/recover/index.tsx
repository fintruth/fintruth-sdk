import { Link as BaseLink, RouteComponentProps } from '@reach/router'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import styled, { NoticeVariant } from 'styled-components' // eslint-disable-line import/named
import { object, string } from 'yup'

import BaseButton from 'components/button'
import BaseNotice from 'components/notice'
import Input from 'components/input'
import { centered, link } from 'styles/deprecated'
import { renderLoadingIf } from 'utilities/loading'
import {
  RecoverMutationData,
  RecoverMutationVariables,
  RecoverQueryData,
  recoverMutation,
  recoverQuery,
} from './graphql'

interface Values {
  email: string
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

const validationSchema = object().shape({
  email: string()
    .required('This is a required field')
    .email('Please provide a valid email address'),
})

const formId = 'recover__Form'

const Recover: React.FunctionComponent<RouteComponentProps> = ({
  ...props
}: RouteComponentProps) => {
  const [notice, setNotice] = React.useState<null | string>(null)
  const [variant, setVariant] = React.useState<NoticeVariant>('success')

  return (
    <Root data-testid="recover" {...props}>
      <Query<RecoverQueryData> query={recoverQuery}>
        {({ data = {}, loading }) => (
          <Mutation<RecoverMutationData, RecoverMutationVariables>
            mutation={recoverMutation}
            onCompleted={({ response }) => {
              if (response.error) {
                setNotice(response.error.message)
                setVariant('danger')
              } else {
                setNotice('A verification email has been sent')
                setVariant('success')
              }
            }}
          >
            {(onSubmit, result) =>
              renderLoadingIf(loading, () => (
                <React.Fragment>
                  {notice && <Notice variant={variant}>{notice}</Notice>}
                  <Formik<Values>
                    initialValues={{ email: data.user ? data.user.email : '' }}
                    onSubmit={(variables, { resetForm }) =>
                      onSubmit({ variables }).then(value =>
                        path(['data', 'response', 'error'], value)
                          ? undefined
                          : resetForm({ email: '' })
                      )
                    }
                    validationSchema={validationSchema}
                  >
                    <Form id={formId} noValidate>
                      <Input
                        id={`${formId}-email`}
                        autoComplete="off"
                        form={formId}
                        label="EMAIL"
                        name="email"
                        type="email"
                      />
                      <Disclaimer>
                        Already have email and password?{' '}
                        {data.user ? (
                          <Link to="/settings">Settings</Link>
                        ) : (
                          <Link to="/sign-in">Sign in</Link>
                        )}
                      </Disclaimer>
                      <Button
                        form={formId}
                        isLoading={result.loading}
                        status="primary"
                        type="submit"
                      >
                        RECOVER
                      </Button>
                    </Form>
                  </Formik>
                </React.Fragment>
              ))
            }
          </Mutation>
        )}
      </Query>
    </Root>
  )
}

export default Recover
