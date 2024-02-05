import Button from "@elements/Button";
import { $app } from "@constants/div.app";

import { type ModalImplements } from "./type";

import style from './style.module.scss';

class Modal implements ModalImplements {
  protected $modalWrapper: HTMLElement | null = null;
  protected $modalTitle: HTMLElement | null = null;
  protected $modalBody: HTMLElement | null = null;
  protected $modalFooter: HTMLElement | null = null;

  constructor() {
  }

  public get modal() {
    return this.$modalWrapper;
  }

  public get modalTitle() {
    return this.$modalTitle;
  }

  public get modalBody() {
    return this.$modalBody;
  }

  public get modalFooter() {
    return this.$modalFooter;
  }

  protected buildModalWrapper = () => {
    const $modalWrapper = document.createElement('div');
    $modalWrapper.setAttribute('id', 'modal_wrapper');

    this.$modalWrapper = $modalWrapper;

    $modalWrapper.appendChild(this.buildModalOverlay());
    $app?.appendChild(this.$modalWrapper);
  }

  protected buildModalOverlay = () => {
    const $overlay = document.createElement('div');
    $overlay.className = [
      style.overlay,
      'd-flex',
      'just-content-center',
      'align-items-center'
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
      'd-flex',
      'just-content-space-between',
      'flex-direction-column',
      'minwd-40',
      'minhg-30',
      'px-10',
      'py-10'
    ].join(' ')

    $modal.appendChild(this.buildModalTitle());
    $modal.appendChild(this.buildModalBody());
    $modal.appendChild(this.buildModalFooter());
    
    return $modal;
  }

  protected buildModalTitle = () => {
    const $title = document.createElement('div');

    $title.className = [
      style.modalTitle,
      'd-flex',
      'just-content-space-between',
      'align-items-center'
    ].join(' ')
    ;

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

    this.$modalTitle = $title

    return $title;
  }

  buildModalBody = () => {
    const $body = document.createElement('div');

    $body.className = [
      'd-flex',
      'just-content-center',
    ].join(' ')

    this.$modalBody = $body

    return $body;
  }

  buildModalFooter = () => {
    const $footer = document.createElement('div');

    $footer.className = [
      'd-flex',
      'just-content-center',
    ].join(' ')

    this.$modalFooter = $footer;

    return $footer;
  }

  protected toggleBodyHide(isHidden: boolean = false) {
    if (isHidden) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  public openModal = ($title: HTMLElement | null, $body: HTMLElement | null, $footer: HTMLElement | null) => {
    this.toggleBodyHide();

    this.buildModalWrapper();

    const $btnCross = this.$modalTitle?.querySelector('button')

    if ($title  && $btnCross) {
      this.$modalTitle?.insertBefore($title, $btnCross);
      }

    if ($body) {
    this.$modalBody?.appendChild($body);
    }

    if ($footer) {
      this.$modalFooter?.appendChild($footer);
    }
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