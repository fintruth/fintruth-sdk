declare module 'reactabular-table' {
  import {
    Component,
    HTMLAttributes,
    ReactElement,
    TableHTMLAttributes,
  } from 'react'

  export type CellFormatter<RowData = {}> = (
    value: any,
    extraParams: ExtraCellParams<RowData>
  ) => ReactElement | string

  export type CellTransform<RowData = {}> = (
    value: any,
    extraParams: ExtraCellParams<RowData>
  ) => Record<string, any>

  export type HeaderFormatter = (
    label: string,
    extraParams: ExtraHeaderParams
  ) => ReactElement | string

  export type HeaderTransform = (
    label: string,
    extraParams: ExtraHeaderParams
  ) => Record<string, any>

  export type Row = Record<string, any>

  export type RowKey<RowData = {}> = (data: RowKeyData<RowData>) => string

  export interface BodyProps<RowData = {}>
    extends TableHTMLAttributes<HTMLTableSectionElement> {
    onRow?: (
      rowData: RowData,
      extraParams: ExtraRowParams<RowData>
    ) => Record<string, any>
    rowKey: RowKey<RowData> | string
    rows: Column[] | [][]
  }

  export interface CellType<RowData = {}> {
    formatters?: CellFormatter<RowData>[]
    property?: number | string
    props?: HTMLAttributes<HTMLTableCellElement>
    transforms?: CellTransform<RowData>[]
  }

  export interface Column<RowData = {}> {
    cell?: CellType<RowData>
    header?: HeaderType
    property?: number | string
  }

  interface ExtraCellParams<RowData = {}> {
    column: Column
    columnIndex: number
    property: number | string
    rowData: RowData
    rowIndex: number
    rowKey: RowKey<RowData> | string
  }

  interface ExtraHeaderParams {
    column: Column
    columnIndex: number
    property: number | string
  }

  interface ExtraRowParams<RowData = {}> {
    rowIndex: number
    rowKey?: RowKey<RowData> | string
  }

  export interface HeaderProps
    extends TableHTMLAttributes<HTMLTableSectionElement> {
    headerRows?: Column[][]
  }

  export interface HeaderType {
    formatters?: HeaderFormatter[]
    label?: string
    props?: HTMLAttributes<HTMLTableCellElement>
    transforms?: HeaderTransform[]
  }

  export interface ProviderProps extends TableHTMLAttributes<HTMLTableElement> {
    columns: Column[]
    renderers?: Renderers
  }

  export interface Renderers {
    body?: SectionRenderers
    header?: SectionRenderers
    table?: string
  }

  interface RowKeyData<RowData = {}> {
    rowData: RowData
    rowIndex: number
  }

  export interface SectionRenderers {
    wrapper?: string
    row?: string
    cell?: string
  }

  export class Body<RowData = {}> extends Component<BodyProps<RowData>> {}

  export class Header extends Component<HeaderProps> {}

  export class Provider extends Component<ProviderProps> {}
}
