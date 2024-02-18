import { type IconConstructor } from "@elements/Icon"
import { type ButtonConstructor } from "@elements/Button"

export interface SnackbarInterface {
  snackbarsContainer: HTMLElement | null
}

export interface SnackbarConstructor {
  message: string
  variant?: 'default' | 'error' | 'warning' | 'info' | 'success'
  position?: 'top-center' | 'top-right' | 'bottom-right' |
            'bottom-center' | 'bottom-left' | 'top-left'
  transition?: 'left' | 'up' | 'right' | 'down'
  startIcon?: IconConstructor | null
  endIcon?: IconConstructor | null
  button?: ButtonConstructor | null
}