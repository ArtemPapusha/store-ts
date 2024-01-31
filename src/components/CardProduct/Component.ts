import Button from '@elements/Button';
import Typography from '@elements/Typography';

import style from "./style.module.scss"

import { type CardProductInterface } from "./type"
import { type Product } from '@state/ProductState';


class CardProduct implements CardProductInterface {
  protected category: string = '';
  protected title: Typography;
  protected image: string = '';
  protected description: Typography;
  protected price: Typography;
  protected buttonCart: Button;
  protected buttonFavorite: Button;
  protected $cardWrapper: HTMLElement | null = null;
  
  constructor({
      category = '',
      title,
      image = '',
      description,
      price,
    }: Product) {
    this.category = category;

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
      className: category,
      textContent: {
        type: 'button'
      },
      variant: 'outlined',
      color: 'secondary-light',
      startIcon: {
        iconName: 'heart',
        color: 'secondary-light',
      },
      extraClassName: 'px-2 py-2',
    })

    this.buttonCart = new Button({
      className: category,
      textContent: {
        type: 'button'
      },
      variant: 'outlined',
      color: 'secondary-light',
      startIcon: {
        iconName: 'cart',
        color: 'black',
      },
      extraClassName: 'px-2 py-2',
    })

    this.buildCardWrapper();

  }

  public get cardWrapper() {
    return this.$cardWrapper;
  }

  protected buildCardWrapper = () => {
    const $cardWrapper = document.createElement('div');
    
    $cardWrapper.className = [
      style.cardWrapper,
      'd-flex',
      'just-content-flex-start',
      'align-items-center',
      'flex-direction-column',
      'flex-wrap-wrap',
      'wd-20',
      'py-3',
      'px-3',
      'gap-10',
      'my-3',
      'mx-3',
    ].join(' ');
    
    $cardWrapper.appendChild(this.buildTitle());
    $cardWrapper.appendChild(this.buildImage());

    const $footerCardProduct = document.createElement('div');

    $footerCardProduct.className = [
      style.cardProductFooter,
      'd-flex',
      'just-content-space-between',
      'align-items-center',
      'flex-direction-row',
      'gap-10',
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
      style.cardProductTitle
    ].join(' ');

    if (this.title && this.title.textElement) {
      $title.appendChild(this.title.textElement);
    }
    
    return $title;
  }

  protected buildImage = () => {
    const $imgWrapper = document.createElement('div');
    $imgWrapper.className = style.cardProductImg;

    const $image = document.createElement('img');

    $image.className = style.cardProductImg;
  
    $image.setAttribute('src', `${this.image}`);
    $image.setAttribute('alt', `${this.category}`);
    $imgWrapper.appendChild($image);

    return $imgWrapper;
  }

  protected buildDescription = () => {
    const $description = document.createElement('div');

    $description.className = style.cardProductDescription;

    if (this.description && this.description.textElement) {
      $description.appendChild(this.description.textElement);
    }

    return $description;
  }

  protected buildPrice = () => {
    const $price = document.createElement('div');

    $price.className = [
      style.cardProductPrice,
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