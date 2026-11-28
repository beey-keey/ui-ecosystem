export type SelectValue = string | number
export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
}
export type SelectSize = 'sm' | 'md' | 'lg'
export interface SelectProps {
  id?: string
  name?: string
  size?: SelectSize
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  autocomplete?: string
  options: SelectOption[]
}
