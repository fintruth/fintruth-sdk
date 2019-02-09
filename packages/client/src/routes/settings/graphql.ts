import gql from 'graphql-tag'

export const accountQuery = gql`
  query AccountQuery {
    user: currentUser {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`

export const updateEmailMutation = gql`
  mutation UpdateEmailMutation($newEmail: String!, $password: String!) {
    response: updateEmail(newEmail: $newEmail, password: $password) {
      error {
        message
      }
      user {
        id
        email
      }
    }
  }
`

export const updatePasswordMutation = gql`
  mutation UpdatePasswordMutation($newPassword: String!, $password: String!) {
    response: updatePassword(newPassword: $newPassword, password: $password) {
      error {
        message
      }
    }
  }
`

export const updateProfileMutation = gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput!) {
    response: updateProfile(input: $input) {
      error {
        message
      }
      profile {
        firstName
        lastName
      }
    }
  }
`
