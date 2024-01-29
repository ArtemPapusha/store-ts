import Typography from "@elements/Typography";
import Icon from "@elements/Icon";

import style from "./style.module.scss";

import { type Color } from "@type/app";

import {
  type ButtonInterface,
  type ButtonConstructor,
} from "./type"

class Button implements ButtonInterface {
  protected $buttonElement: HTMLElement | null = null;
  protected className: string = '';
  protected textContent: Typography;
  protected variant: string = 'text';
  protected buttonSize: string = '';
  protected color: Color = 'black';
  protected disabled: boolean = false;
  protected startIcon: Icon;
  protected endIcon: Icon;
  protected handleClick: void;

  constructor({
    className = '',
    textContent,
    variant = 'text',
    buttonSize = '',
    color = 'black',
    disabled = false,
    startIcon,
    endIcon,
    handleClick
  }: ButtonConstructor) {
    this.className = className;

    if(textContent) {
      this.textContent = new Typography(textContent);
    }

    this.variant = variant;
    this.buttonSize = buttonSize;
    this.color = color;
    this.disabled = disabled;

    if(startIcon) {
      this.startIcon = new Icon(startIcon);
    }

    if(endIcon) {
      this.endIcon = new Icon(endIcon);
    }

    this.handleClick = handleClick;

    this.buildButton();
  }

  public get buttonElement() {
    return this.$buttonElement;
  }

  public addEventListener(eventType: string, callback: () => void) {
    this.buttonElement?.addEventListener(eventType, callback);
  }

  protected buildButton = () => {
    const $button = document.createElement('button');

    $button.setAttribute('type', 'button');

    $button.addEventListener('click', () => this.handleClick)
    
    if (this.startIcon && this.startIcon.icon) {
      $button.appendChild(this.startIcon.icon);
    }

    if (this.textContent && this.textContent.textElement) {
      $button.appendChild(this.textContent.textElement);
    }

    if (this.endIcon && this.endIcon.icon) {
      $button.appendChild(this.endIcon.icon);
    }
    
    $button.className = [
      style.button,
      style[`button-${this.className}`],
      style[`button-${this.variant}`],
      style[`button-${this.buttonSize}`],
      'd-flex',
      'just-content-center',
      'align-items-center',
      'flex-direction-row',
      'bgc-${this.color}',
      'br-${this.color}',
    ].join(' ');

    if (this.disabled) {
      $button.setAttribute('disabled', 'disabled');
      $button.classList.add(style['button-disabled']);
    }

    this.$buttonElement = $button;
  }

}

export default Button;