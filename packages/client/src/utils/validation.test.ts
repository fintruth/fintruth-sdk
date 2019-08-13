import {
  InputContext,
  SelectContext,
  validateInput,
  validateSelect,
} from './validation'

describe('validateInput', () => {
  test('should not return an error message given any value', async () => {
    const context: InputContext = { isRequired: false }

    expect(await validateInput('', context)).toStrictEqual('')
    expect(await validateInput('a', context)).toStrictEqual('')
  })

  test('should return an error message given an empty value', async () => {
    const context: InputContext = { isRequired: true }

    expect(await validateInput('', context)).not.toStrictEqual('')
    expect(await validateInput('a', context)).toStrictEqual('')
  })

  test('should return an error message given an improperly formatted email', async () => {
    const context: InputContext = { isRequired: false, type: 'email' }

    expect(await validateInput('', context)).toStrictEqual('')
    expect(await validateInput('a', context)).not.toStrictEqual('')
    expect(await validateInput('a@a.a', context)).toStrictEqual('')
  })

  test('should return an error message given a weak password', async () => {
    const context: InputContext = { isRequired: false, type: 'password' }

    expect(await validateInput('', context)).toStrictEqual('')
    expect(await validateInput('A', context)).not.toStrictEqual('')
    expect(await validateInput('A!s2d3f4g5', context)).toStrictEqual('')
  })
})

describe('validateSelect', () => {
  test('should not return an error message given any value', async () => {
    const context: SelectContext = { isRequired: false }

    expect(await validateSelect('', context)).toStrictEqual('')
    expect(await validateSelect('a', context)).toStrictEqual('')
  })

  test('should return an error message given an empty value', async () => {
    const context: SelectContext = { isRequired: true }

    expect(await validateSelect('', context)).not.toStrictEqual('')
    expect(await validateSelect('a', context)).toStrictEqual('')
  })
})
