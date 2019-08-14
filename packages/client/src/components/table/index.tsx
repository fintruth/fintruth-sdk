import { rem } from 'polished'
import { mergeDeepRight } from 'ramda'
import React from 'react'
import { useUIDSeed } from 'react-uid'
import {
  Body,
  Column,
  Header,
  Provider,
  Renderers,
  Row,
  RowKey,
} from 'reactabular-table'
import styled from 'styled-components'

import { formatEmpty, mergeColumnDefaults } from 'utils/table'
import Td from './td'
import Th from './th'
import Thead from './thead'

export interface Props
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: Column<any>[]
  renderers?: Renderers
  rowKey?: RowKey<any> | string
  rows: Row[]
}

const columnDefaults = {
  cell: { formatters: [formatEmpty] },
}

const defaultRenderers = {
  body: { cell: Td },
  header: { cell: Th, wrapper: Thead },
}

const Root = styled(Provider)`
  margin-bottom: ${rem(30)};
  table-layout: fixed;
  width: 100%;
`

const Table: React.FunctionComponent<Props> = ({
  columns,
  renderers = {},
  rowKey,
  rows,
  ...props
}: Props) => {
  const seed = useUIDSeed()

  return (
    <Root
      columns={mergeColumnDefaults(columnDefaults, columns)}
      renderers={mergeDeepRight(defaultRenderers, renderers)}
      {...props}
    >
      <Header />
      <Body rowKey={rowKey || (({ rowIndex }) => seed(rowIndex))} rows={rows} />
    </Root>
  )
}

export { Td, Th, Thead }
export * from './mixins'
export default Table
