import { mergePartitions, mergePartitionsByKey } from './store'

describe('mergePartitions', () => {
  test('should return a merged partitions object', () => {
    const partitions = {
      a: { defaults: { a: { b: true } }, typeDefs: 'a' },
      b: { resolvers: { a: { b: () => {} } }, typeDefs: 'b' },
      c: { defaults: { c: null }, resolvers: { a: { c: () => {} } } },
    }

    expect(mergePartitions(partitions)).toStrictEqual({
      defaults: { a: { b: true }, c: null },
      resolvers: { a: { b: expect.any(Function), c: expect.any(Function) } },
      typeDefs: 'ab',
    })
  })
})

describe('mergePartitionsByKey', () => {
  test('should return a merged defaults object', () => {
    const partitions = {
      a: { defaults: { a: { b: true } } },
      b: {},
      c: { defaults: { c: null } },
    }

    expect(mergePartitionsByKey('defaults', partitions)).toStrictEqual({
      a: { b: true },
      c: null,
    })
  })

  test('should return a merged resolvers object', () => {
    const partitions = {
      a: {},
      b: { resolvers: { a: { b: () => {} } } },
      c: { resolvers: { a: { c: () => {} } } },
    }

    expect(mergePartitionsByKey('resolvers', partitions)).toStrictEqual({
      a: { b: expect.any(Function), c: expect.any(Function) },
    })
  })

  test('should return a merged typeDefs string', () => {
    const partitions = { a: { typeDefs: 'a' }, b: { typeDefs: 'b' }, c: {} }

    expect(mergePartitionsByKey('typeDefs', partitions)).toStrictEqual('ab')
  })
})
