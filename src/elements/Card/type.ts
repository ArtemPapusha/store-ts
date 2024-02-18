export interface CardInterface {
  cardWrapper: HTMLElement | null
  cardBodyList: HTMLElement | null
  footerCardGrid: HTMLElement | null
  footerCardList: HTMLElement | null
  amountCardWrapList: HTMLElement | null
}

export interface CardCon {
  id?: string,
  category?: string,
  title?: string,
  image?: string,
  description?: string,
  price?: string,
}

export enum TypeCard {
  grid = 'grid',
  list = 'list',
  listCart = 'listCart'
}