import { rem } from 'polished'
import { mergeDeepRight } from 'ramda'
import React from 'react'
import {
  Body,
  Column,
  Header,
  Provider,
  Renderers,
  Row,
} from 'reactabular-table'
import styled, { css } from 'styled-components'

import { formatEmpty, mergeColumnDefaults } from 'utils/table'

interface Props {
  columns: Column[]
  renderers?: Renderers
  rowKey?: string
  rows: Row[]
}

const Root = styled(Provider)`
  margin-bottom: ${rem(30)};
  table-layout: fixed;
  width: 100%;
`

export const Thead = styled.thead`
  border-bottom: ${rem(1)} solid ${({ theme }) => theme.whiteTer};
  border-top: ${rem(1)} solid ${({ theme }) => theme.whiteTer};
`

const cell = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Td = styled.td`
  ${cell}
  color: ${({ theme }) => theme.gray};
  padding-top: ${rem(30)};
`

export const Th = styled.th`
  ${cell}
  color: ${({ theme }) => theme.grayLight};
  font-size: ${rem(12)};
  font-weight: 700;
  padding: ${rem(18)} 0 ${rem(19)};
`

const defaultRenderers = {
  body: { cell: Td },
  header: { cell: Th, wrapper: Thead },
}

const columnDefaults = {
  cell: { formatters: [formatEmpty] },
}

const Table: React.FunctionComponent<Props> = ({
  columns,
  rowKey = 'id',
  renderers = {},
  rows,
  ...props
}: Props) => (
  <Root
    columns={mergeColumnDefaults(columnDefaults, columns)}
    renderers={mergeDeepRight(defaultRenderers, renderers)}
    {...props}
  >
    <Header />
    <Body rowKey={rowKey} rows={rows} />
  </Root>
)

export default Table
