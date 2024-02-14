import type { Color } from '@type/app';

export interface TypographyInterface {
  textElement: HTMLElement | null
}

export type TypographyType =
  'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'button'
  | 'caption'
  | 'overline'

export interface TypographyConstructor {
  text?: string
  type?: TypographyType
  position?: 'up' | 'down' | ''
  textColor?: Color
  textWeight?: 100 | 300 | 400 | 500 | 700 | 900
  extraClassName?: string
}