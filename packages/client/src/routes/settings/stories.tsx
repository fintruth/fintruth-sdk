import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { storiesOf } from '@storybook/react'

import {
  accountQuery,
  confirmTwoFactorAuthMutation,
  disableTwoFactorAuthMutation,
  enableTwoFactorAuthMutation,
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
          isTwoFactorAuthEnabled: false,
          profile: { familyName: 'User', givenName: 'Demo' },
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
      variables: { input: { familyName: 'User', givenName: 'Demo' } },
    },
    result: {
      data: {
        response: {
          error: null,
          profile: { familyName: 'User', givenName: 'Demo' },
        },
      },
    },
  },
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: {
        response: {
          dataUrl:
            'data:image/png;base64,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',
          error: null,
          secret: 'NYTDMZSWJ5NHUNCBKAUFOUB6OZBHA3Z3GJVUONZBEUSTCJDJEZ5Q',
        },
      },
    },
  },
  {
    request: {
      query: confirmTwoFactorAuthMutation,
      variables: { token: '123456' },
    },
    result: { data: { response: { error: null } } },
  },
]

const defaultTwoFactorAuthEnabledMocks = [
  {
    request: { query: accountQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          isTwoFactorAuthEnabled: true,
          profile: { familyName: 'User', givenName: 'Demo' },
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
      variables: { input: { familyName: 'User', givenName: 'Demo' } },
    },
    result: {
      data: {
        response: {
          error: null,
          profile: { familyName: 'User', givenName: 'Demo' },
        },
      },
    },
  },
  {
    request: {
      query: disableTwoFactorAuthMutation,
      variables: { token: '123456' },
    },
    result: { data: { response: { error: null } } },
  },
]

const delayMocks = defaultMocks.map(defaultMock => ({
  ...defaultMock,
  delay: 5000,
}))

const delayTwoFactorAuthEnabledMocks = defaultTwoFactorAuthEnabledMocks.map(
  defaultTwoFactorAuthEnabledMock => ({
    ...defaultTwoFactorAuthEnabledMock,
    delay: 5000,
  })
)

const errorMocks = [
  {
    request: { query: accountQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          isTwoFactorAuthEnabled: false,
          profile: { familyName: 'User', givenName: 'Demo' },
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
      variables: { input: { familyName: 'User', givenName: 'Demo' } },
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
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: {
        response: {
          dataUrl: null,
          error: {
            message:
              'An error occurred while enabling two-factor authentication',
          },
          secret: null,
        },
      },
    },
  },
  {
    request: { query: enableTwoFactorAuthMutation },
    result: {
      data: {
        response: {
          dataUrl:
            'data:image/png;base64,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',
          error: null,
          secret: 'NYTDMZSWJ5NHUNCBKAUFOUB6OZBHA3Z3GJVUONZBEUSTCJDJEZ5Q',
        },
      },
    },
  },
  {
    request: {
      query: confirmTwoFactorAuthMutation,
      variables: { token: '123456' },
    },
    result: {
      data: {
        response: {
          error: { message: 'The verification code has expired or is invalid' },
        },
      },
    },
  },
]

const errorTwoFactorAuthEnabledMocks = [
  {
    request: { query: accountQuery },
    result: {
      data: {
        user: {
          id: 'c1eff49f-7f0c-4635-9ed0-5088cd73b32a',
          email: 'demo@fintruth.com',
          isTwoFactorAuthEnabled: true,
          profile: { familyName: 'User', givenName: 'Demo' },
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
      variables: { input: { familyName: 'User', givenName: 'Demo' } },
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
  {
    request: {
      query: disableTwoFactorAuthMutation,
      variables: { token: '123456' },
    },
    result: {
      data: {
        response: {
          error: { message: 'The verification code has expired or is invalid' },
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
  .add('Default (2FA Enabled)', () => (
    <MockedProvider
      addTypename={false}
      mocks={defaultTwoFactorAuthEnabledMocks}
    >
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay', () => (
    <MockedProvider addTypename={false} mocks={delayMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Delay (2FA Enabled)', () => (
    <MockedProvider addTypename={false} mocks={delayTwoFactorAuthEnabledMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Error', () => (
    <MockedProvider addTypename={false} mocks={errorMocks}>
      <Settings />
    </MockedProvider>
  ))
  .add('With Error (2FA Enabled)', () => (
    <MockedProvider addTypename={false} mocks={errorTwoFactorAuthEnabledMocks}>
      <Settings />
    </MockedProvider>
  ))
