import { hasResponseError } from './apollo'

describe('hasResponseError', () => {
  test('should return a boolean representing the presence of a response error in the provided data', () => {
    expect(hasResponseError()).toBeFalsy()
    expect(hasResponseError(null)).toBeFalsy()
    expect(hasResponseError('')).toBeFalsy()
    expect(hasResponseError({ response: null })).toBeFalsy()
    expect(hasResponseError({ response: '' })).toBeFalsy()
    expect(hasResponseError({ response: {} })).toBeFalsy()
    expect(hasResponseError({ response: { error: null } })).toBeFalsy()
    expect(hasResponseError({ response: { error: '' } })).toBeFalsy()
    expect(hasResponseError({ response: { error: {} } })).toBeTruthy()
  })
})
