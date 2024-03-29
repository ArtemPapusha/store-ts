import FieldValidation from "@elements/FieldValidation";
import Icon from "@elements/Icon";

import style from './style.module.scss'

import {
  type FieldInputImplements,
  type FieldInputConstructor
} from './type'

class FieldInput extends FieldValidation implements FieldInputImplements {
  protected $inputWrapper: HTMLElement | null = null;
  protected name: string = '';
  protected label: string = '';
  protected value: string = '';
  protected type: string = '';
  protected placeholder: string = '';
  protected id: string = '';
  protected startIcon: Icon;
  protected endIcon: Icon;

  constructor({
    name = '',
    label = '',
    value = '',
    type = 'text',
    placeholder = '',
    id = '',
    startIcon,
    endIcon,
  }: FieldInputConstructor) {
    super();
    this.name = name;
    this.label = label;
    this.type = type;
    this.value = value;
    this.placeholder = placeholder;
    this.id = id;

    if(startIcon) {
      this.startIcon = new Icon(startIcon);
    }

    if(endIcon) {
      this.endIcon = new Icon(endIcon);
    }

    this.buildFieldWrapper();
  }

  get inputWrapper() {
    return this.$inputWrapper;
  }

  buildFieldWrapper = () => {
    const $wrapper = document.createElement('div');

    $wrapper.className = [
      style.fieldWrapper,
      'mb-5',
      'd-flex',
      'flex-direction-column',
      'align-items-flex-start',
      'gap-1'
    ].join(' ');

    if (this.startIcon && this.startIcon.icon) {
      $wrapper.appendChild(this.startIcon.icon);
    }
    if (this.id) {
      $wrapper.appendChild(this.buildLabel());
    }

    $wrapper.appendChild(this.buildInput());

    if (this.endIcon && this.endIcon.icon) {
      $wrapper.appendChild(this.endIcon.icon);
    }

    this.$inputWrapper = $wrapper;
  };

  buildLabel = () => {
    const $label = document.createElement('label');
    
    $label.setAttribute('for', this.id);

    $label.className = [
      'mb-4',
      'ml-4',
    ].join(' ');

    $label.innerText = this.label;

    return $label;
  };

  buildInput = () => {
    const $input = document.createElement('input');

    $input.setAttribute('type', this.type);
    $input.setAttribute('name', this.name);
    $input.setAttribute('placeholder', this.placeholder);
    $input.setAttribute('id', `${this.id}`);
    $input.setAttribute('value', this.value);
    $input.setAttribute('size', '60');

    $input.className = [
      'py-2',
      'px-2',
    ].join(' ');

    $input.addEventListener('input', this.handleChange);

    $input.addEventListener('blur', this.handleBlur);

    return $input;
  };

  handleBlur = (event: Event) => {
    this.handleError((event.target as HTMLInputElement).value);
  };
  
  handleChange = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
  
    this.handleError(this.value);
  
    (event.target as HTMLInputElement).value = this.value;
  };
}

export default FieldInput;