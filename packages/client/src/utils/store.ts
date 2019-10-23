import { isEmpty, join, mergeDeepRight, reduce } from 'ramda'

interface Partition {
  defaults?: {}
  resolvers?: {}
  typeDefs?: string
}

interface Partitions {
  [key: string]: Partition
}

export const mergePartitionsByKey = (
  key: keyof Partition,
  partitions: Partitions
) => {
  let action: Function = reduce(mergeDeepRight, {} as object)
  let initialValue: {} | string = {}

  if (key === 'typeDefs') {
    action = join('')
    initialValue = ''
  }

  return Object.keys(partitions).reduce<typeof initialValue>((acc, val) => {
    const partition = partitions[val]

    return key in partition ? action([acc, partition[key]]) : acc
  }, initialValue)
}

export const mergePartitions = (partitions: Partitions) => {
  const initialValue = { defaults: {}, resolvers: {}, typeDefs: '' }

  return Object.keys(initialValue).reduce<Partition>((acc, val) => {
    const result = mergePartitionsByKey(val as keyof Partition, partitions)

    return isEmpty(result) ? acc : { ...acc, [val]: result }
  }, initialValue)
}
