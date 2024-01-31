import Typography from "@elements/Typography";
import Icon from "@elements/Icon";

import style from "./style.module.scss";

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
  protected color: string = '';
  protected disabled: boolean = false;
  protected startIcon: Icon;
  protected endIcon: Icon;
  protected handleClick: void;
  protected extraClassName: string = '';

  constructor({
    className = '',
    textContent,
    variant = 'text',
    buttonSize = '',
    color = 'info',
    disabled = false,
    startIcon,
    endIcon,
    handleClick,
    extraClassName = ''
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
    this.extraClassName = extraClassName;

    this.buildButton();
  }

  public get buttonElement() {
    return this.$buttonElement;
  }

  public addEventListener(eventType: string, callback: () => void) {
    this.buttonElement?.addEventListener(eventType, callback);
  }

  public setAttribute(type: string, value: string) {
    this.buttonElement?.setAttribute(type, value)
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
      `bgc-${this.color}`,
      `br-${this.color}`,
      `${this.extraClassName}`
    ].join(' ');

    if (this.disabled) {
      $button.setAttribute('disabled', 'disabled');
      $button.classList.add(style.buttonDisabled);
    }

    this.$buttonElement = $button;
  }

}

export default Button;