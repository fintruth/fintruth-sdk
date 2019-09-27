import { hasResponseError } from './apollo'

describe('hasResponseError', () => {
  test('should return a boolean representing the presence of a response error in the provided data', () => {
    expect(hasResponseError()).toBeFalsy()
    expect(hasResponseError({})).toBeFalsy()
    expect(hasResponseError({ response: { error: {} } })).toBeTruthy()
    expect(hasResponseError({ response: { error: '' } })).toBeTruthy()
  })
})
