import { type FieldValidationImplements } from "./type";

import style from './style.module.scss'

class FieldValidation implements FieldValidationImplements {
  protected $errorMessage: HTMLElement | null = null;
  protected errors: string = '';
  protected validations: ((value: string) => string | '')[] = [];
  protected $inputWrapper: HTMLElement | null = null;

  constructor() {
    this.validations = [];
  }

  public get errorMessage() {
    return this.$errorMessage;
  }

  buildErrorMessage = () => {
    const $message = document.createElement('div');

    $message.className = [
      style.fieldErrorMessage,
      'px-1',
      'py-1',
    ].join(' ');

    $message.innerText = this.errors;

    this.$inputWrapper?.appendChild($message)

    this.$errorMessage = $message;
  };

  removeErrorMessage = () => {
    if (this.$errorMessage) {
      this.$errorMessage.remove();
    }
    this.$errorMessage = null;
  };

  handleErrorMessage = () => {
    if (this.errors && this.$errorMessage) {
      this.$errorMessage.innerText = this.errors;
    } else if (this.errors && !this.$errorMessage) {
      this.buildErrorMessage();
      setTimeout(() => {
        this.removeErrorMessage();
      }, 5000);
    } else if (!this.errors && this.$errorMessage) {
      this.removeErrorMessage();
    }
  };

  addValidation = (validation: (value: string) => string | '') => {
    this.validations.push(validation);
    return this;
  };

  handleError = (value: string) => {
    for (let key of this.validations.keys()) {
      const result = this.validations[key](value);

      if (result) {
        this.errors = result;
        break;
      }

      if (this.validations.length - 1 === key && result === '') {
        this.errors = '';
      }
    }
    this.handleErrorMessage();
  
  };
}

export default FieldValidation;