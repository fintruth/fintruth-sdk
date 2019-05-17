import { curry, type } from 'ramda'

const isObjectLike = (value: any) =>
  Array.isArray(value) || type(value) === 'Object'

export const omitDeep = curry((keys: string[], obj: {} | any[]) => {
  if (!isObjectLike(obj)) {
    return obj
  }

  if (Array.isArray(obj)) {
    const result: any[] = obj.map(value =>
      isObjectLike(value) ? omitDeep(keys, value) : value
    )

    return result
  }

  const result: { [key: string]: any } = {}

  for (const [key, value] of Object.entries(obj)) {
    if (!keys.includes(key)) {
      result[key] = isObjectLike(value) ? omitDeep(keys, value) : value
    }
  }

  return result
})
