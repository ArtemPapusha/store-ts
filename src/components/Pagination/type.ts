import { Color } from "@type/app"

export interface PaginationInterface {
  pagination: HTMLElement | null
}

export interface PaginationConstructor {
  active: number,
  pagesAmount: number,
  variant?: 'text' | 'text-circle' | 'contained' | 'contained-circle' | 'outlined' |    'outlined-circle',
  color?: Color | null,
  textColor?: Color | null,
  size?: 'small' | 'large' | '',
}