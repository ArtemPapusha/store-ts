import { type Color, type IconName} from "@type/app"

import style from "./style.module.scss"
import colors from "@style/utils/colors.module.scss"
import fonts from "@style/utils/fonts.module.scss"
import space from "@style/utils/space.module.scss"

import {
  type IconInterface,
  type IconConstructor,
} from "./type"

class Icon implements IconInterface {
  protected iconName: IconName = 'heart';
  protected size: number = 16;
  protected color: Color = 'primary';
  protected className: string = '';
  protected $iconElement: HTMLElement | null = null;

  constructor({
    iconName = 'heart',
    size = 16,
    color = 'primary',
    className = ''
  }: IconConstructor) {

    this.iconName = iconName;
    this.size = size;
    this.color = color;
    this.className = className;

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
      colors[`text-${this.color}`],
      fonts[`fs-${this.size}`],
    ].join(' ');

    if (this.className?.length) {
      $icon.className = space[`${this.className}`]
    }

    this.$iconElement = $icon;
  };


}

export default Icon;