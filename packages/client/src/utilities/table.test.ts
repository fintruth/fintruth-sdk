import { formatEmpty, mergeColumnDefaults } from './table'

test('The formatEmpty function should return a placeholder if the cell value is determined to be empty', () => {
  expect(formatEmpty('')).toStrictEqual('-')
  expect(formatEmpty(null)).toStrictEqual('-')
  expect(formatEmpty(undefined)).toStrictEqual('-')
  expect(formatEmpty('abcd')).toStrictEqual('abcd')
  expect(formatEmpty(0)).toStrictEqual(0)
  expect(formatEmpty(false)).toStrictEqual(false)
})

test('The mergeColumnDefaults function should merge each of the column objects in the provided columns array with the provided defaults object', () => {
  const columns = [
    {
      property: 'company',
      cell: { formatters: [() => {}] },
      header: { props: { className: 'companyHeader' } },
    },
  ]
  const defaults = {
    cell: { formatters: [() => {}], props: { className: 'td' } },
    header: { props: { className: 'th' } },
  }

  expect(mergeColumnDefaults(defaults, columns)).toStrictEqual([
    {
      property: 'company',
      cell: {
        formatters: [expect.any(Function), expect.any(Function)],
        props: { className: 'td' },
      },
      header: { props: { className: 'companyHeader' } },
    },
  ])
})
