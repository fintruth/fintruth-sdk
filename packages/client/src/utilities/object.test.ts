import { omitDeep } from './object'

describe('omitDeep', () => {
  test('should return an unmodified object', () => {
    const date = new Date()
    const result = omitDeep([], date)

    expect(result).toStrictEqual(date)
  })

  test('should return an object with the nested keys removed', () => {
    const result = omitDeep(['a', 'c'], { a: 'a', b: 'b', c: 'c' })

    expect(result).toStrictEqual({ b: 'b' })
  })

  test('should return an object with the deeply nested keys removed', () => {
    const result = omitDeep(['b', 'd', 'f'], {
      a: 'a',
      b: 'b',
      c: { b: 'b', d: 'd', e: { b: 'b', f: 'f', g: { b: 'b', c: 'c' } } },
    })

    expect(result).toStrictEqual({ a: 'a', c: { e: { g: { c: 'c' } } } })
  })

  test('should return an array with the deeply nested keys removed', () => {
    const date = new Date()
    const result = omitDeep(
      ['b'],
      [{ a: 'a', b: 'b' }, date, [{ a: 'a', b: 'b' }]]
    )

    expect(result).toStrictEqual([{ a: 'a' }, date, [{ a: 'a' }]])
  })
})
