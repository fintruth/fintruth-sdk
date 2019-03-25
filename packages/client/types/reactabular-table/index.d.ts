declare module 'reactabular-table' {
  import * as React from 'react'

  interface BodyProps
    extends React.TableHTMLAttributes<HTMLTableSectionElement> {
    onRow?: Function
    rowKey: Function | string
    rows: Column[] | [][]
  }

  interface CellType {
    formatters?: Function[]
    property?: number | string
    props?: React.HTMLAttributes<HTMLTableCellElement>
    transforms?: Function[]
  }

  interface Column {
    cell?: CellType
    header?: HeaderType
    property?: number | string
  }

  interface HeaderProps
    extends React.TableHTMLAttributes<HTMLTableSectionElement> {
    headerRows?: Column[][]
  }

  interface HeaderType {
    formatters?: Function[]
    label?: string
    props?: React.HTMLAttributes<HTMLTableCellElement>
    transforms?: Function[]
  }

  interface ProviderProps extends React.TableHTMLAttributes<HTMLTableElement> {
    columns: Column[]
    renderers?: Renderers
  }

  interface Renderers {
    body?: SectionRenderers
    header?: SectionRenderers
    table?: string
  }

  interface Row {
    [key: string]: any
  }

  interface SectionRenderers {
    wrapper?: string
    row?: string
    cell?: string
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class Body extends React.Component<BodyProps> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class Header extends React.Component<HeaderProps> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class Provider extends React.Component<ProviderProps> {}
}
