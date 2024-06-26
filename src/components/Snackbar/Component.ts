import Icon from '@elements/Icon';
import Typography from '@elements/Typography';
import Button from '@elements/Button';

import style from './style.module.scss'

import {
  type SnackbarInterface,
  type SnackbarConstructor,
} from "./type"

class Snackbar implements SnackbarInterface{
  protected $snackbar: HTMLElement | null = null;
  protected message: Typography;
  protected variant: string = 'default';
  protected position: string = 'bottom-left';
  protected transition: string = 'up';
  protected startIcon: Icon;
  protected endIcon: Icon;
  protected button: Button;

  protected static $snackbarsContainer: HTMLElement | null = null;

  constructor({
    message = '',
    variant = 'default',
    position = 'bottom-left',
    transition = 'up',
    startIcon,
    endIcon,
    button
  }: SnackbarConstructor) {

    if(message) {
      this.message = new Typography({
        text: message,
        type: 'body1',
        textColor: 'white',
      });
    };
    
    this.variant = variant;
    this.position = position;
    this.transition = transition;

    if(startIcon) {
      this.startIcon = new Icon(startIcon);
    }

    if(endIcon) {
      this.endIcon = new Icon(endIcon);
    }

    if(button) {
      this.button = new Button(button);
    }

    this.buildSnackbarContainer();
  }

  public get snackbar() {
    return this.$snackbar;
  }

  public get snackbarsContainer() {
    return Snackbar.$snackbarsContainer;
  }

  public buildSnackbarContainer = () => {
    if (!Snackbar.$snackbarsContainer) {
      const $snackbarsContainer = document.createElement('div');

      $snackbarsContainer.className = [
        style.snackbarContainer,
        style[`snackbar__container--${this.position}`],
        'd-flex',
        'just-content-flex-start',
        'align-items-center',
        'flex-direction-column',
        'gap-3',
      ].join(' ');

      Snackbar.$snackbarsContainer = $snackbarsContainer;

      document.body.appendChild($snackbarsContainer);
    }

    setTimeout(() => {
      this.removeSnackbar()
    }, 3000);
  }

  public buildSnackbar = () => {
    const $snackbarBody = document.createElement('div');
    
    $snackbarBody.className = [
      style.snackbar,
      style[`snackbar--${this.variant}`],
      style[`snackbar--${this.transition}`],
      'd-flex',
      'just-content-flex-start',
      'align-items-center',
    ].join(' ');

    if (this.startIcon?.icon) {
      $snackbarBody.appendChild(this.startIcon.icon);
    }

    if (this.message?.textElement) {
      $snackbarBody.appendChild(this.message.textElement);
    }

    if (this.endIcon?.icon) {
      $snackbarBody.appendChild(this.endIcon.icon);
    }

    if (this.button?.buttonElement) {
      $snackbarBody.appendChild(this.button.buttonElement);
    }

    this.$snackbar = $snackbarBody;
    
    Snackbar.$snackbarsContainer?.appendChild(this.$snackbar);
  }

  protected removeSnackbar = () => {
    if (Snackbar.$snackbarsContainer &&  this.$snackbar) {
      if (Snackbar.$snackbarsContainer.contains(this.$snackbar)) {
        this.$snackbar.remove();
      }
    }
  }

}

export default Snackbar;