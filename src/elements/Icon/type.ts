import type { Color, IconName } from '@type/app.ts';

export interface IconInterface {
  icon: HTMLElement | null
}

export interface IconConstructor {
  iconName?: IconName | null
  size?: 12 | 14 | 16 | 18 | 24 | 26
  color?: Color | null
  className?: string
}