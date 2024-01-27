import Button from "@elements/Button";
import { $divApp } from "@constants/div.app";

import {
  type ModalImplements,
  type ModalConstructor
} from "./type";

import style from './style.module.scss';
import flex from '../../assets/style/utils/flex.module.scss';
import sizes from '../../assets/style/utils/sizes.module.scss';
import space from '../../assets/style/utils/space.module.scss';

class Modal implements ModalImplements{
  protected $modalWrapper: HTMLElement | null = null;
  protected title: string = '';
  protected body: object = {};
  protected footer: string = ''

  constructor({
    title = '',
    body = {},
    footer = ''
  }: ModalConstructor) {
    this.title = title;
    this.body = body;
    this.footer = footer;
  }

  public get modal() {
    return this.$modalWrapper;
  }

  protected buildModalWrapper = () => {
    const $modalWrapper = document.createElement('div');
    $modalWrapper.setAttribute('id', 'modal_wrapper');

    this.$modalWrapper = $modalWrapper;

    $modalWrapper.appendChild(this.buildModalOverlay());
    $divApp?.appendChild(this.$modalWrapper);
  }

  protected buildModalOverlay = () => {
    const $overlay = document.createElement('div');
    $overlay.className = [
      style.overlay,
      flex['d-flex'],
      flex['just-content-center'],
      flex['align-items-center']
    ].join(' ')

    $overlay?.addEventListener('click', (e) => {
      if (e.target === $overlay) {
        this.closeModal();
      }
    })

    $overlay.appendChild(this.buildModal());
    return $overlay;
  }

  protected buildModal = () => {
    const $modal = document.createElement('div');
    $modal.className = [
      style.modal,
      flex['d-flex'],
      flex['just-content-space-between'],
      flex['flex-direction-column'],
      sizes['wd-40'],
      sizes['hg-30'],
      space['px-10'],
      space['py-10']
    ].join(' ')

    $modal.appendChild(this.buildModalTitle());
    $modal.appendChild(this.buildModalBody());
    $modal.appendChild(this.buildModalFooter());

    return $modal;
  }

  protected buildModalTitle = () => {
    const $title = document.createElement('div');

    $title.className = [
      style['modal-title'],
      flex['d-flex'],
      flex['just-content-space-between'],
      flex['align-items-center']
    ].join(' ')
    ;
    
    $title.innerHTML = `${this.title}`;

    const $modalCross = new Button({
      startIcon: {
        iconName: 'cancel-circle',
        color: 'black'
      }
    })

    $modalCross?.addEventListener('click', () => {
      this.closeModal();
    })

    if ($modalCross.buttonElement) {
    $title.appendChild($modalCross.buttonElement)
    }

    return $title;
  }

  buildModalBody = () => {
    const $body = document.createElement('div');
    $body.className = style['modal-body'];
    $body.innerHTML = `${this.body}`;

    return $body;
  }

  buildModalFooter = () => {
    const $footer = document.createElement('div');
    $footer.className = style['modal-footer'];
    $footer.innerHTML = `${this.footer}`;

    return $footer;
  }

  protected toggleBodyHide(isHidden: boolean = false) {
    if (isHidden) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  public openModal = () => {
    this.toggleBodyHide();

    this.buildModalWrapper();
  }

  protected destroy = () => {
    this.$modalWrapper?.remove();
  }

  public closeModal = () => {
    this.toggleBodyHide(true);

    this.destroy();
  }

}

export default Modal;
