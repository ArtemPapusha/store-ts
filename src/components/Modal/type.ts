export interface ModalImplements {
  modal: HTMLElement | null
  modalBody: HTMLElement | null
  modalFooter: HTMLElement | null
}

export interface ModalConstructor {
  title?: string,
}