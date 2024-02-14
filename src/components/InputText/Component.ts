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
  protected textAlign: string = 'left';
  protected size: string = '';
  protected placeholder: string = '';
  protected id: string = '';
  protected startIcon: Icon;
  protected endIcon: Icon;

  constructor({
    name = '',
    label = '',
    value = '',
    type = 'text',
    textAlign = 'left',
    size = '',
    placeholder = '',
    id = '',
    startIcon,
    endIcon,
  }: FieldInputConstructor) {
    super();
    this.name = name;
    this.label = label;
    this.type = type;
    this.textAlign = textAlign;
    this.size = size
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

  public get inputWrapper() {
    return this.$inputWrapper;
  }

  protected buildFieldWrapper = () => {
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

  protected buildLabel = () => {
    const $label = document.createElement('label');
    
    $label.setAttribute('for', this.id);

    $label.className = [
      'mb-4',
      'ml-4',
    ].join(' ');

    $label.innerText = this.label;

    return $label;
  };

  protected buildInput = () => {
    const $input = document.createElement('input');

    $input.setAttribute('type', this.type);
    $input.setAttribute('size', this.size);
    $input.setAttribute('name', this.name);
    $input.setAttribute('placeholder', this.placeholder);
    $input.setAttribute('id', `${this.id}`);
    $input.setAttribute('value', this.value);

    $input.className = [
      style[`inputText-${this.textAlign}`],
      'py-2',
      'px-2',
    ].join(' ');

    $input.addEventListener('input', this.handleChange);

    $input.addEventListener('blur', this.handleBlur);

    return $input;
  };

  protected handleBlur = (event: Event) => {
    this.handleError((event.target as HTMLInputElement).value);
  };
  
  protected handleChange = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
  
    this.handleError(this.value);
  
    (event.target as HTMLInputElement).value = this.value;
  };
}

export default FieldInput;