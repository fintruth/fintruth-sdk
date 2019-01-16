import { Column } from 'reactabular-table'
import { isEmpty, isNil, mergeDeepWith, type } from 'ramda'

const customizer = (l: any, r: any) => {
  switch (type(l)) {
    case 'Array':
      return l.concat(r)
    default:
      return r
  }
}

export const formatEmpty = (value?: any) =>
  isEmpty(value) || isNil(value) ? '-' : value

export const mergeColumnDefaults = (defaults: Column, columns: Column[]) =>
  columns.map(mergeDeepWith(customizer, defaults))
