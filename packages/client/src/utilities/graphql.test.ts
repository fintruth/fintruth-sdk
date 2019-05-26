import { toProfileInput, toRegisterInput } from './graphql'

const getSubProfileInput = () => ({
  userId: 'fee62cfe-6e81-4977-ab0b-0cb99a1f4f6b',
  familyName: 'User',
  givenName: 'Demo',
  createdAt: '2019-05-25T20:03:23.300Z',
  updatedAt: '2019-05-25T20:03:23.300Z',
  __typename: 'SubProfileInput',
})

const getSubRegisterInput = () => ({
  email: 'demo@fintruth.com',
  emailConfirm: 'demo@fintruth.com',
  password: 'Asdfg!2345',
  profile: getSubProfileInput(),
  __typename: 'SubRegisterInput',
})

describe('toProfileInput', () => {
  it('should return an object strictly containing ProfileInput keys', () => {
    expect(toProfileInput(getSubProfileInput())).toMatchInlineSnapshot(`
      Object {
        "familyName": "User",
        "givenName": "Demo",
      }
    `)
  })
})

describe('toRegisterInput', () => {
  it('should return an object strictly containing RegisterInput keys', () => {
    expect(toRegisterInput(getSubRegisterInput())).toMatchInlineSnapshot(`
      Object {
        "email": "demo@fintruth.com",
        "password": "Asdfg!2345",
        "profile": Object {
          "familyName": "User",
          "givenName": "Demo",
        },
      }
    `)
  })
})
