import type { Color } from '@type/app';
import type { IconName } from '@type/icons'

export interface IconInterface {
  icon: HTMLElement | null
}

export interface IconConstructor {
  iconName?: IconName | null
  size?: 12 | 14 | 16 | 18 | 24 | 26
  color?: Color | null
  className?: string
}