declare module 'reactabular-table' {
  import * as React from 'react'

  export interface BodyProps
    extends React.TableHTMLAttributes<HTMLTableSectionElement> {
    onRow?: Function
    rowKey: Function | string
    rows: Column[] | [][]
  }

  export interface CellType {
    formatters?: Function[]
    property?: number | string
    props?: React.HTMLAttributes<HTMLTableCellElement>
    transforms?: Function[]
  }

  export interface Column {
    cell?: CellType
    header?: HeaderType
    property?: number | string
  }

  export interface HeaderProps
    extends React.TableHTMLAttributes<HTMLTableSectionElement> {
    headerRows?: Column[][]
  }

  export interface HeaderType {
    formatters?: Function[]
    label?: string
    props?: React.HTMLAttributes<HTMLTableCellElement>
    transforms?: Function[]
  }

  export interface ProviderProps
    extends React.TableHTMLAttributes<HTMLTableElement> {
    columns: Column[]
    renderers?: Renderers
  }

  export interface Renderers {
    body?: SectionRenderers
    header?: SectionRenderers
    table?: string
  }

  export interface Row {
    [key: string]: any
  }

  export interface SectionRenderers {
    wrapper?: string
    row?: string
    cell?: string
  }

  export class Body extends React.Component<BodyProps> {}

  export class Header extends React.Component<HeaderProps> {}

  export class Provider extends React.Component<ProviderProps> {}
}
