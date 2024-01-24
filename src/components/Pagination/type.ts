import { Color } from "@type/app"

export interface PaginationInterface {
  pagination: HTMLElement | null
}


export interface PaginationConstructor {
  elementsAmount: number,
  active: number,
  variant?: 'text' | 'text-circle' | 'contained' | 'contained-circle' | 'outlined' |    'outlined-circle',
  color?: Color,
  textColor?: Color,
  size?: 'small' | 'large' | '',
}