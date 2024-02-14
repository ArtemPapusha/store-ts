import Typography from '@elements/Typography';
import Button from '@elements/Button';

import style from './style.module.scss'

import { type ProductCartImp } from './type'


class ProductCart implements ProductCartImp {
  protected id: string;
  protected $productCart: HTMLElement | null = null
  protected $productCartFooter: HTMLElement | null = null

  constructor() {
    this.buildProductCart()
  }

  get productCart() {
    return this.$productCart;
  }

  get productCartFooter() {
    return this.$productCartFooter;
  }

  public buildProductCart = () => {
    const $productCart = document.createElement('div')
    
    $productCart.setAttribute('id', 'product_cart')

    $productCart.className = [
      style.productCart,
      'd-flex',
      'flex-direction-column',
      'just-content-flex-start',
      'align-items-center'
    ].join(' ')
    
    this.$productCart = $productCart;
  }

  public cartFooter = (totalPrice: number) => {
    const $cartFooterWrapper = document.createElement('div')

    $cartFooterWrapper.className = [
      'd-flex',
      'just-content-space-between',
      'align-items-center',
      'gap-70'
    ].join(' ')

    const $buyBtn = new Button({
      textContent: {
        text: 'To order',
        type: 'button'
      },
      variant: 'outlined',
      extraClassName: 'py-2 px-2'
    }).buttonElement

    $buyBtn?.setAttribute('id', 'make_order')

    const $totalPrice = new Typography({
      text: `Total price ` + String(totalPrice) + ` грн`,
      type: 'h5'
    }).textElement

    $totalPrice?.setAttribute('id', 'total_price')

    if ($buyBtn && $totalPrice) {
      $cartFooterWrapper.appendChild($buyBtn)
      $cartFooterWrapper.appendChild($totalPrice)
    }

    return $cartFooterWrapper;
  }
 
}

export default ProductCart;