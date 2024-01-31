import type { Color } from '@type/app';
import type { IconName } from '@type/icons'

export interface IconInterface {
  icon: HTMLElement | null
}

export interface IconConstructor {
  iconName?: IconName | null
  size?: 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  color?: Color | null
  extraClassName?: string
}