import gql from 'graphql-tag'

export const signUpMutation = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input)
  }
`
