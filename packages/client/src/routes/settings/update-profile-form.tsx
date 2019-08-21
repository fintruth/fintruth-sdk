import { useMutation } from '@apollo/react-hooks'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import { path } from 'ramda'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components' // eslint-disable-line import/named

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import {
  QueriedProfile,
  UpdateProfileMutationData,
  UpdateProfileMutationVariables,
  currentProfileQuery,
  updateProfileMutation,
} from './graphql'
import { button, field, form } from './mixins'

interface HelpProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color
}

interface Props
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onReset' | 'onSubmit'
  > {
  profile: QueriedProfile
}

interface Values {
  familyName: string
  givenName: string
}

const name = 'update-profile-form'

const Help = styled.p.attrs((props: HelpProps) => ({
  color: 'success',
  ...props,
}))`
  ${({ color, theme }) => help(theme[color])};
  margin: ${rem(-10)} 0 ${rem(30)};
  width: ${rem(280)};
`

const Form = styled(BaseForm)`
  ${form};
`

const Field = styled(BaseField)`
  ${field};
`

const Button = styled(BaseButton)`
  ${button};
`

const UpdateProfileForm: React.FunctionComponent<Props> = ({
  profile: { familyName, givenName },
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()

  const [onSubmit, { loading: isSubmitting }] = useMutation<
    UpdateProfileMutationData,
    UpdateProfileMutationVariables
  >(updateProfileMutation, {
    awaitRefetchQueries: true,
    onCompleted: ({ response }) =>
      setHelpProps(
        response.error
          ? { children: response.error.message, color: 'danger' }
          : { children: 'Your profile information was successfully updated' }
      ),
    refetchQueries: ({ data }) =>
      path(['response', 'error'], data) ? [] : [{ query: currentProfileQuery }],
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={{ familyName, givenName }}
        onSubmit={input => onSubmit({ variables: { input } })}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form {...props} id={seed(name)} noValidate>
          <Field name="givenName">
            <FieldLabel>First Name</FieldLabel>
            <FieldInput autoComplete="given-name" form={seed(name)} />
            <FieldHelp />
          </Field>
          <Field name="familyName">
            <FieldLabel>Last Name</FieldLabel>
            <FieldInput autoComplete="family-name" form={seed(name)} />
            <FieldHelp />
          </Field>
          <Button
            form={seed(name)}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Save
          </Button>
        </Form>
      </Formik>
    </>
  )
}

export default UpdateProfileForm
