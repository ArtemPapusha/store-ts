export interface ModalImplements {
  modal: HTMLElement | null
}

export interface ModalConstructor {
  title?: string,
  body?: object,
  footer?: string
}