import { type TypographyConstructor } from "@elements/Typography"
import { IconConstructor } from "@elements/Icon"
import type { Color } from "@type/app"

export interface ButtonInterface {
  buttonElement: HTMLElement | null
}

export interface ButtonConstructor {
  className?: string
  textContent?: TypographyConstructor
  variant?: 'text' | 'text-circle' | 'contained' | 'contained-circle' | 'outlined' | 'outlined-circle'
  buttonSize?: 'small' | 'large' | ''
  color?: Color
  disabled?: boolean
  startIcon?: IconConstructor
  endIcon?: IconConstructor
  handleClick?: void
  extraClassName?: string
}