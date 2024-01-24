import Icon from '@elements/Icon';
import Typography from '@elements/Typography';
import Button from '@elements/Button';

import style from './style.module.scss'
import flex from "@style/utils/flex.module.scss"
import space from "@style/utils/space.module.scss"

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

    this.buildSnackbar();
  }

  public get snackbar() {
    return this.$snackbar;
  }

  public get snackbarsContainer() {
    return Snackbar.$snackbarsContainer;
  }

  protected buildSnackbar = () => {
    if (!Snackbar.$snackbarsContainer) {
      const $snackbarsContainer = document.createElement('div');
      $snackbarsContainer.className = [
        style['snackbar__container'],
        style[`snackbar__container--${this.position}`],
        flex[`d-flex`],
        flex[`just-content-flex-start`],
        flex[`align-items-center`],
        flex[`flex-direction-column`],
        space[`gap-3`],
      ].join(' ');
      
      // `snackbar__container d-flex flex-direction-column just-content-flex-start align-items-center snackbar__container--${this.position} gap-3`;

      document.body.appendChild($snackbarsContainer);
      Snackbar.$snackbarsContainer = $snackbarsContainer;
    }
  
    const $snackbarBody = document.createElement('div');
    $snackbarBody.className = [
      style.snackbar,
      style[`snackbar--${this.variant}`],
      style[`snackbar--${this.transition}`],
      flex[`d-flex`],
      flex[`just-content-flex-start`],
      flex[`align-items-center`],
    ].join(' ');
    
    // `snackbar d-flex just-content-flex-start align-items-center snackbar--${this.variant} snackbar--${this.transition}`;

    if (this.startIcon.icon) {
      $snackbarBody.appendChild(this.startIcon.icon);
    }

    if (this.message.textElement) {
      $snackbarBody.appendChild(this.message.textElement);
    }

    if (this.endIcon.icon) {
      $snackbarBody.appendChild(this.endIcon.icon);
    }

    if (this.button.buttonElement) {
      $snackbarBody.appendChild(this.button.buttonElement);
    }

    this.$snackbar = $snackbarBody;

  }

  public removeSnackbar = () => {
    if (Snackbar.$snackbarsContainer &&  this.$snackbar) {
      if (Snackbar.$snackbarsContainer.contains(this.$snackbar)) {
        this.$snackbar.remove();
      }
    }
   
    return this;
  }

}

export default Snackbar;