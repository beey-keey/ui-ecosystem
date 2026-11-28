export type InputType = 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url'
export type InputValue = string | number
export type InputSize = 'sm' | 'md' | 'lg'
export interface InputProps {
  id?: string
  name?: string
  size?: InputSize
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  autocomplete?: string
  type?: InputType
  readonly?: boolean
}
