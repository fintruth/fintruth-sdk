import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'

import {
  accountQuery,
  updateEmailMutation,
  updatePasswordMutation,
  updateProfileMutation,
} from './graphql'
import Settings from '.'

const defaultMocks = [
  {
    request: { query: accountQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          profile: { firstName: 'Demo', lastName: 'User' },
        },
      },
    },
  },
  {
    request: {
      query: updateEmailMutation,
      variables: { newEmail: 'test@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'test@fintruth.com',
          },
        },
      },
    },
  },
  {
    request: {
      query: updatePasswordMutation,
      variables: {
        newPassword: 'A!s2d3f4g5',
        newPasswordConfirm: 'A!s2d3f4g5',
        password: 'Asdfg!2345',
      },
    },
    result: { data: { response: { error: null } } },
  },
  {
    request: {
      query: updateProfileMutation,
      variables: { input: { firstName: 'Test', lastName: 'User' } },
    },
    result: {
      data: {
        response: {
          error: null,
          profile: { firstName: 'Test', lastName: 'User' },
        },
      },
    },
  },
]

const delayMocks = [
  {
    delay: 5000,
    request: { query: accountQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          profile: { firstName: 'Demo', lastName: 'User' },
        },
      },
    },
  },
  {
    delay: 5000,
    request: {
      query: updateEmailMutation,
      variables: { newEmail: 'test@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: null,
          user: {
            id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
            email: 'test@fintruth.com',
          },
        },
      },
    },
  },
  {
    delay: 5000,
    request: {
      query: updatePasswordMutation,
      variables: {
        newPassword: 'A!s2d3f4g5',
        newPasswordConfirm: 'A!s2d3f4g5',
        password: 'Asdfg!2345',
      },
    },
    result: { data: { response: { error: null } } },
  },
  {
    delay: 5000,
    request: {
      query: updateProfileMutation,
      variables: { input: { firstName: 'Test', lastName: 'User' } },
    },
    result: {
      data: {
        response: {
          error: null,
          profile: { firstName: 'Test', lastName: 'User' },
        },
      },
    },
  },
]

const errorMocks = [
  {
    request: { query: accountQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          profile: { firstName: 'Demo', lastName: 'User' },
        },
      },
    },
  },
  {
    request: {
      query: updateEmailMutation,
      variables: { newEmail: 'test@fintruth.com', password: 'Asdfg!2345' },
    },
    result: {
      data: {
        response: {
          error: {
            message: 'We encountered an issue when updating your email',
          },
          user: null,
        },
      },
    },
  },
  {
    request: {
      query: updatePasswordMutation,
      variables: {
        newPassword: 'A!s2d3f4g5',
        newPasswordConfirm: 'A!s2d3f4g5',
        password: 'Asdfg!2345',
      },
    },
    result: {
      data: {
        response: {
          error: {
            message: 'We encountered an issue when updating your password',
          },
        },
      },
    },
  },
  {
    request: {
      query: updateProfileMutation,
      variables: { input: { firstName: 'Test', lastName: 'User' } },
    },
    result: {
      data: {
        response: {
          error: {
            message: 'We encountered an issue when updating your profile',
          },
          profile: null,
        },
      },
    },
  },
]

storiesOf('Routes|Settings', module)
  .add('Default', () => (
    <MockedProvider addTypename={false} mocks={defaultMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <Settings />
    </MockedProvider>
  ))
