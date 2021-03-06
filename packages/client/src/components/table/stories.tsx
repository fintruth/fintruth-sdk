import { storiesOf } from '@storybook/react'
import React from 'react'
import { CellFormatter, Column } from 'reactabular-table'

import { centeredVertically } from 'utils/story'
import Table from '.'

interface Row {
  id: string
  company: string
  location?: string
  name: string
  salary?: number
  title?: string
}

const formatSalary: CellFormatter<Row> = (salary: number) =>
  salary.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  })

const columns: Column<Row>[] = [
  { property: 'name', header: { label: 'Name' } },
  { property: 'company', header: { label: 'Company' } },
  { property: 'title', header: { label: 'Title' } },
  {
    property: 'salary',
    cell: { formatters: [formatSalary] },
    header: { label: 'Salary' },
  },
  { property: 'location', header: { label: 'Location' } },
]

const rows: Row[] = [
  {
    id: 'a',
    company: 'Dunder Mifflin',
    name: 'Andrew Bernard',
    salary: 51000,
    title: 'Regional Director in Charge of Sales',
  },
  {
    id: 'b',
    company: 'Dunder Mifflin',
    location: 'Scranton, PA',
    name: 'Michael Scott',
  },
  {
    id: 'c',
    company: 'Dunder Mifflin',
    location: 'Scranton, PA',
    name: 'James Halpert',
    salary: 50500,
  },
]

storiesOf('Components|Table', module)
  .addDecorator(centeredVertically)
  .add('Default', () => <Table columns={columns} rows={rows} />)
