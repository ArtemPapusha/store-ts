import { type Color } from "@type/app"
import { type IconName } from "@type/icons"

import style from "./style.module.scss"

import {
  type IconInterface,
  type IconConstructor,
} from "./type"

class Icon implements IconInterface {
  protected iconName: IconName | null = 'heart';
  protected size: number = 16;
  protected color: Color | null = 'primary';
  protected extraClassName: string = '';
  protected $iconElement: HTMLElement | null = null;

  constructor({
    iconName = 'heart',
    size = 8,
    color = 'primary',
    extraClassName = ''
  }: IconConstructor) {

    this.iconName = iconName;
    this.size = size;
    this.color = color;
    this.extraClassName = extraClassName;

    this.buildIcon();
  }

  public get icon() {
    return this.$iconElement;
  }

  protected buildIcon = () => {
    const $icon = document.createElement('i');
 
    $icon.className = [
      style.icon,
      style[`icon-${this.iconName}`],
      `text-${this.color}`,
      `fs-${this.size}`,
      `${this.extraClassName}`
    ].join(' ');
    
    this.$iconElement = $icon;
  };


}

export default Icon;