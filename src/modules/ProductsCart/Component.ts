import Button from "@elements/Button"
import Typography from "@elements/Typography"
import InputText from "@components/InputText"

import style from './style.module.scss'


class ProductsCart {
  protected $productCart: HTMLElement | null = null

  constructor() {
    this.buildProductWrapper
  }

  protected buildProductCart = () => {
    const $productCart = document.createElement('div')

    $productCart.className = [
      'd-flex',
      'flex-direction-column',
      'just-content-flex-start',
      'align-items-center'
    ].join(' ')

    this.$productCart = $productCart;

    return $productCart;
  }

  protected buildProductWrapper = (logo: string, descrip: string, price: number) => {
    const $productWrapper = document.createElement('div');

    $productWrapper.className = [
      'd-flex',
      'just-content-flex-start',
      'align-items-center'
    ].join(' ')

    const $columnWrapper = document.createElement('div');

    $columnWrapper.className = [
      'd-flex',
      'flex-direction-column',
      'just-content-center',
      'align-items-flex-start'
    ].join(' ')

    $columnWrapper.appendChild(this.buildProductBody(descrip))
    $columnWrapper.appendChild(this.buildProductFooter(price))

    $productWrapper.appendChild(this.buildProductLogo(logo))
    $productWrapper.appendChild($columnWrapper)

    return $productWrapper;
  }

  protected buildProductLogo = (link: string) => {
    const $imgWrapper = document.createElement('div');
    // $imgWrapper.className = style.productLogo;

    const $image = document.createElement('img');

    // $image.className = style.productLogo;
  
    $image.setAttribute('src', `${link}`);
    $image.setAttribute('alt', ``);
    $imgWrapper.appendChild($image);

    return $imgWrapper;
  }

  protected buildProductBody = (description: string) => {
    const $bodyWrapper = document.createElement('div');

    $bodyWrapper.className = [
      'd-flex',
      'just-content-space-between',
      'align-items-center'
    ].join(' ');

    const $desrcipt = new Typography({
      text: description,
      type:'body2'
    })

    const $deleteBtn = new Button({
      textContent: {
        text: 'Delete'
      },
      startIcon: {
        iconName: 'bin'
      }
    })

    // $deleteBtn.addEventListener('click', () => {})

    if ($desrcipt.textElement) {
      $bodyWrapper.appendChild($desrcipt.textElement);
    }
    if ($deleteBtn.buttonElement) {
      $bodyWrapper.appendChild($deleteBtn.buttonElement);
    }

    return $bodyWrapper;
  } 

  protected buildProductFooter = (price: number) =>{
    const $footerWrapper = document.createElement('div');

    $footerWrapper.className = [
      'd-flex',
      'just-content-flex-end',
      'align-items-center',
      // 'gap-10',
    ].join(' ');

    const $amountProductWrap = document.createElement('div');

    $amountProductWrap.className = [
      'd-flex',
      'just-content-space-around',
      'align-items-center',
      // 'gap-10',
    ].join(' ');

    const $minusBtn = new Button({
      startIcon: {
        iconName: 'minus'
      }
    })

    // $minusBtn.addEventListener('click', () => {})

    const $inputAmount = new InputText({
      name: 'amount',
      value: '1',
      type: 'text',
      id: 'inputAmount'
    })

    const $plusBtn = new Button({
      startIcon: {
        iconName: 'plus'
      }
    })

    // $plusBtn.addEventListener('click', () => {})

    if ($minusBtn.buttonElement) {
      $amountProductWrap.appendChild($minusBtn.buttonElement);
    } 
    if ($inputAmount.inputWrapper) {
      $amountProductWrap.appendChild($inputAmount.inputWrapper);
    }
    if ($plusBtn.buttonElement) {
      $amountProductWrap.appendChild($plusBtn.buttonElement);
    } 

    const $productPrice = new Typography({
      text: String(price),
      type: 'subtitle2'
    })

    $footerWrapper.appendChild($amountProductWrap);

    if ($productPrice.textElement) {
      $footerWrapper.appendChild($productPrice.textElement);
    }

    return $footerWrapper;
  }
 
}

export default ProductsCart;