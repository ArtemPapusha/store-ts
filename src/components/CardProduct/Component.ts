import Button from '@elements/Button';
import Typography from '@elements/Typography';

import style from "./style.module.scss"

import { type CardProductInterface } from "./type"
import { type Product } from '@state/ProductState';


class CardProduct implements CardProductInterface {
  protected name: string = '';
  protected title: Typography;
  protected image: string = '';
  protected description: Typography;
  protected price: Typography;
  protected buttonCart: Button;
  protected buttonFavorite: Button;
  protected $cardWrapper: HTMLElement | null = null;
  
  constructor({
      name = '',
      title,
      image = '',
      description,
      price,
    }: Product) {
    this.name = name;

    if(title) {
      this.title = new Typography({
        text: title,
        type: 'h6',
      })
    }

    this.image = image;
 
    if(description) {
      this.description = new Typography({
        text: description,
        type: 'body2'
      })
    }
  
    if(price) {
      this.price = new Typography({
        text: price + ` грн`,
        type: 'caption'
      })
    }
    
    this.buildTitle();
    this.buildImage();
    this.buildDescription();
    this.buildPrice();

    this.buttonFavorite = new Button({
      className: name,
      textContent: {
        type: 'button'
      },
      variant: 'outlined',
      buttonSize: '',
      color: 'secondary-light',
      disabled: false,
      startIcon: {
        iconName: 'heart',
        size: 14,
        color: "secondary-light",
      }
    })

    this.buttonCart = new Button({
      className: name,
      textContent: {
        type: 'button'
      },
      variant: 'outlined',
      buttonSize: '',
      color: 'secondary-light',
      disabled: false,
      startIcon: {
        iconName: 'cart',
        size: 14,
        color: "black",
      }
    })

    this.buildCardWrapper();

  }

  public get cardWrapper() {
    return this.$cardWrapper;
  }

  protected buildCardWrapper = () => {
    const $cardWrapper = document.createElement('div');

    $cardWrapper.className = [
      style['card-wrapper'],
      style[`card-wrapper-${this.name}`],
      `d-flex`,
      `just-content-flex-start`,
      `align-items-center`,
      `flex-direction-column`,
      `flex-wrap-wrap`,
      `wd-20`,
      `py-3`,
      `px-3`,
      `gap-10`,
      `my-3`,
      `mx-3`,
    ].join(' ');
    
    $cardWrapper.appendChild(this.buildTitle());
    $cardWrapper.appendChild(this.buildImage());

    const $footerCardProduct = document.createElement('div');

    $footerCardProduct.className = [
      style['card-product__footer'],
      `d-flex`,
      `just-content-space-between`,
      `align-items-center`,
      `flex-direction-row`,
      `gap-10`,
    ].join(' ');
    
    $footerCardProduct.appendChild(this.buildPrice());

    if (this.buttonFavorite && this.buttonFavorite.buttonElement) {
      $footerCardProduct.appendChild(this.buttonFavorite.buttonElement);
    }

    if (this.buttonCart && this.buttonCart.buttonElement) {
      $footerCardProduct.appendChild(this.buttonCart.buttonElement);
    }

    $cardWrapper.appendChild($footerCardProduct);
    $cardWrapper.appendChild(this.buildDescription());

    this.$cardWrapper = $cardWrapper;
  }

  protected buildTitle = () => {
    const $title = document.createElement('div');

    $title.className = [
      style['card-product__title'],
      style[`card-product__title--${this.name}`],
    ].join(' ');

    if (this.title && this.title.textElement) {
      $title.appendChild(this.title.textElement);
    }
    
    return $title;
  }

  protected buildImage = () => {
    const $imgWrapper = document.createElement('div');
    $imgWrapper.className = style['card-product__img'];

    const $image = document.createElement('img');

    $image.className = [
      style['card-product__img'],
      style[`card-product__img--${this.name}`],
    ].join(' ');

    $image.setAttribute('src', `${this.image}`);
    $image.setAttribute('alt', `${this.name}`);
    $imgWrapper.appendChild($image);

    return $imgWrapper;
  }

  protected buildDescription = () => {
    const $description = document.createElement('div');

    $description.className = [
      style['card-product__description'],
      style[`card-product__description--${this.name}`],
    ].join(' ');

    if (this.description && this.description.textElement) {
      $description.appendChild(this.description.textElement);
    }

    return $description;
  }

  protected buildPrice = () => {
    const $price = document.createElement('div');

    $price.className = [
      style['card-product__price'],
      style[`card-product__price--${this.name}`],
      'py-2',
      'px-2',
    ].join(' ');

    if (this.price && this.price.textElement) {
      $price.appendChild(this.price.textElement);
    }

    return $price;
  }

}

export default CardProduct;