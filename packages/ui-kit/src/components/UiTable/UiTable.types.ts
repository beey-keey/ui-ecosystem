export interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}
export interface TableProps<T extends object = Record<string, unknown>> {
  columns: TableColumn[]
  rows: T[]
  rowKey: keyof T
  caption: string
  emptyText?: string
}
