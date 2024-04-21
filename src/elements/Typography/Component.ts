import { type Color} from "@type/app"

import style from "./style.module.scss"

import {
  type TypographyInterface,
  type TypographyConstructor,
  type TypographyType
} from "./type"


class Typography implements TypographyInterface {
  protected type: TypographyType = "body1";
  protected text: string = "";
  protected position: string = '';
  protected color: Color = "black";
  protected textWeight: number =  400;
  protected extraClassName: string = '';
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
    position = '',
    textColor = 'black',
    textWeight = 400,
    extraClassName = ''
  }: TypographyConstructor) {

    this.text = text;
    this.type = type;
    this.position = position;
    this.color = textColor;
    this.textWeight = textWeight;
    this.extraClassName = extraClassName;

    this.buildTypographyElement();
  }

  protected buildTypographyElement = () => {
    const $typography = document.createElement(this.getElement());

    $typography.className = [
      style.typography,
      style[`typography-${this.type}`],
      style[`typography-${this.position}`],
      `text-${this.color}`,
      `fw-${this.textWeight}`,
      `${this.extraClassName}`
    ].join(' ');

    $typography.innerText = this.text;

    this.$textCell = $typography;
  }

  protected getElement = () => Typography.types[this.type] || 'span';

  public get textElement() {
    return this.$textCell;
  };

  public getText = () => {
    return this.text;
  }
}

export default Typography;
