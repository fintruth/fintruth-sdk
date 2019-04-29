import React from 'react'
import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'

import Table from '.'

const formatSalary = (salary: number) =>
  salary.toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
  })

const columns = [
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

const rows = [
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
  .addDecorator(centered)
  .add('Default', () => <Table columns={columns} rows={rows} />)
