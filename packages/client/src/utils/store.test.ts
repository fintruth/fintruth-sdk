import { mergePartitions, mergePartitionsByKey } from './store'

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

describe('mergePartitions', () => {
  test('should return a merged partitions object', () => {
    const partitions = {
      a: { defaults: { a: { b: true } }, typeDefs: 'a' },
      b: { resolvers: { a: { b: noop } }, typeDefs: 'b' },
      c: { defaults: { c: null }, resolvers: { a: { c: noop } } },
    }

    expect(mergePartitions(partitions)).toStrictEqual({
      defaults: { a: { b: true }, c: null },
      resolvers: { a: { b: noop, c: noop } },
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
      b: { resolvers: { a: { b: noop } } },
      c: { resolvers: { a: { c: noop } } },
    }

    expect(mergePartitionsByKey('resolvers', partitions)).toStrictEqual({
      a: { b: noop, c: noop },
    })
  })

  test('should return a merged typeDefs string', () => {
    const partitions = { a: { typeDefs: 'a' }, b: { typeDefs: 'b' }, c: {} }

    expect(mergePartitionsByKey('typeDefs', partitions)).toStrictEqual('ab')
  })
})
