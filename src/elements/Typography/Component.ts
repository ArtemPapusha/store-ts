import { type Color} from "@type/app"

import style from "./style.module.scss"
import fonts from "@style/utils/fonts.module.scss"
import colors from "@style/utils/colors.module.scss"

import {
  type TypographyInterface,
  type TypographyConstructor,
  type TypographyType
} from "./type"


class Typography implements TypographyInterface {
  protected type: TypographyType = "body1";
  protected text: string = "";
  protected color: Color = "black";
  protected textWeight: number =  400;
  protected $textCell: null | HTMLElement = null;

  protected static types = {
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    button: 'span',
    caption: 'span',
    overline: 'span'
  }

  constructor({
    text = '',
    type = 'body1',
    textColor = 'black',
    textWeight = 400
  }: TypographyConstructor) {

    this.text = text;
    this.type = type;
    this.color = textColor;
    this.textWeight = textWeight;

    this.buildTypographyElement();
  }

  protected buildTypographyElement = () => {
    const $typography = document.createElement(this.getElement());

    $typography.className = [
      style.typography,
      style[`typography-${this.type}`],
      colors[`text-${this.color}`],
      fonts[`fw-${this.textWeight}`],
    ].join(' ');

    $typography.innerText = this.text;

    this.$textCell = $typography;
  }

  protected getElement = () => Typography.types[this.type] || 'span';

  public get textElement() {
    return this.$textCell;
  };
}

export default Typography;
