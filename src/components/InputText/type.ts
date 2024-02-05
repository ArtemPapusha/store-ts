import { IconConstructor } from "@elements/Icon"

export interface FieldInputImplements {
  inputWrapper: HTMLElement | null
}

export interface FieldInputConstructor {
  name?: string
  label?: string
  value?: string
  type?: string
  placeholder?: string
  id?: string
  startIcon?: IconConstructor
  endIcon?: IconConstructor
}