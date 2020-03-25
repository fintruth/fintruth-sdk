import { useMutation } from '@apollo/react-hooks'
import { Form as BaseForm, Formik } from 'formik'
import { rem } from 'polished'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import styled, { Color } from 'styled-components'

import BaseButton from 'components/button'
import BaseField, { FieldHelp, FieldInput, FieldLabel } from 'components/field'
import { help } from 'styles/mixins'
import { hasResponseError } from 'utils/apollo'
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
  data: QueriedProfile
}

interface Values {
  familyName: string
  givenName: string
}

const Help = styled.p.attrs((attrs) => ({ color: 'success', ...attrs }))<
  HelpProps
>`
  ${({ color, theme }) => help(theme[color])};
  margin-bottom: ${rem(30)};
  width: ${rem(280)};

  &:not(:first-child) {
    margin-top: ${rem(-10)};
  }
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
  data: { familyName, givenName },
  id,
  ...props
}: Props) => {
  const [helpProps, setHelpProps] = React.useState<HelpProps>({})
  const seed = useUIDSeed()
  const formId = id || seed('update-profile-form')

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
      hasResponseError(data) ? [] : [{ query: currentProfileQuery }],
  })

  return (
    <>
      {helpProps.children && <Help {...helpProps} />}
      <Formik<Values>
        initialValues={{ familyName, givenName }}
        onSubmit={(input) => onSubmit({ variables: { input } })}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form {...props} id={formId} noValidate>
          <Field name="givenName">
            <FieldLabel>First Name</FieldLabel>
            <FieldInput autoComplete="given-name" form={formId} />
            <FieldHelp />
          </Field>
          <Field name="familyName">
            <FieldLabel>Last Name</FieldLabel>
            <FieldInput autoComplete="family-name" form={formId} />
            <FieldHelp />
          </Field>
          <Button
            form={formId}
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
