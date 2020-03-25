declare module 'reactabular-table' {
  import {
    Component,
    HTMLAttributes,
    ReactElement,
    TableHTMLAttributes,
  } from 'react'

  type CellFormatter<RowData = any> = (
    value: any,
    extraParams: ExtraCellParams<RowData>
  ) => ReactElement | string

  type CellTransform<RowData = any> = (
    value: any,
    extraParams: ExtraCellParams<RowData>
  ) => Record<string, any>

  type HeaderFormatter<RowData = any> = (
    label: string,
    extraParams: ExtraHeaderParams<RowData>
  ) => ReactElement | string

  type HeaderTransform<RowData = any> = (
    label: string,
    extraParams: ExtraHeaderParams<RowData>
  ) => Record<string, any>

  type Row = Record<string, any>

  type RowKey<RowData = any> = (data: RowKeyData<RowData>) => string

  interface BodyProps<RowData = any>
    extends TableHTMLAttributes<HTMLTableSectionElement> {
    onRow?: (
      rowData: RowData,
      extraParams: ExtraRowParams<RowData>
    ) => Record<string, any>
    rowKey: RowKey<RowData> | keyof RowData
    rows: Column[] | [][]
  }

  interface CellType<RowData = any> {
    formatters?: CellFormatter<RowData>[]
    property?: keyof RowData
    props?: HTMLAttributes<HTMLTableCellElement>
    transforms?: CellTransform<RowData>[]
  }

  interface Column<RowData = any> {
    cell?: CellType<RowData>
    header?: HeaderType<RowData>
    property?: keyof RowData
  }

  interface ExtraCellParams<RowData = any> {
    column: Column<RowData>
    columnIndex: number
    property?: keyof RowData
    rowData: RowData
    rowIndex: number
    rowKey: RowKey<RowData> | keyof RowData
  }

  interface ExtraHeaderParams<RowData = any> {
    column: Column<RowData>
    columnIndex: number
    property?: keyof RowData
  }

  interface ExtraRowParams<RowData = any> {
    rowIndex: number
    rowKey?: RowKey<RowData> | keyof RowData
  }

  interface HeaderProps<RowData = any>
    extends TableHTMLAttributes<HTMLTableSectionElement> {
    headerRows?: Column<RowData>[][]
  }

  interface HeaderType<RowData = any> {
    formatters?: HeaderFormatter<RowData>[]
    label?: string
    props?: HTMLAttributes<HTMLTableCellElement>
    transforms?: HeaderTransform<RowData>[]
  }

  interface ProviderProps extends TableHTMLAttributes<HTMLTableElement> {
    columns: Column[]
    renderers?: Renderers
  }

  interface Renderers {
    body?: SectionRenderers
    header?: SectionRenderers
    table?: string
  }

  interface RowKeyData<RowData = any> {
    rowData: RowData
    rowIndex: number
  }

  interface SectionRenderers {
    wrapper?: string
    row?: string
    cell?: string
  }

  export class Body<RowData = any> extends Component<BodyProps<RowData>> {}

  export class Header<RowData = any> extends Component<HeaderProps<RowData>> {}

  export class Provider extends Component<ProviderProps> {}
}
