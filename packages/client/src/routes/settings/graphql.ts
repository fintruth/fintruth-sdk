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
  mutation UpdateEmailMutation($email: String!, $password: String!) {
    response: updateEmail(email: $email, password: $password) {
      error {
        id
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
  mutation UpdatePasswordMutation(
    $currentPassword: String!
    $newPassword: String!
  ) {
    response: updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      error {
        id
        message
      }
    }
  }
`

export const updateProfileMutation = gql`
  mutation UpdateProfileMutation($input: UpdateProfileInput!) {
    response: updateProfile(input: $input) {
      error {
        id
        message
      }
      profile {
        firstName
        lastName
      }
    }
  }
`
