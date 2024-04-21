import Typography from '@elements/Typography';

import style from './style.module.scss'

import { type CardCon, type CardInterface, TypeCard } from "./type";

class Card implements CardInterface{
  protected $cardWrapper: HTMLElement | null = null;
  protected $cardBodyList: HTMLElement | null = null;
  protected $footerCardGrid: HTMLElement | null = null;
  protected $footerCardList: HTMLElement | null = null;
  protected $amountCardWrapList: HTMLElement | null = null;
  protected variant: TypeCard;
  protected id: string;
  protected category: string = '';
  protected title: Typography;
  protected image: string = '';
  protected description: Typography;
  protected price: string | undefined;
  protected totalPrice: string | undefined;

  constructor(variant: TypeCard, {
    id,
    category = '',
    title,
    image = '',
    description,
    price,
  }: CardCon) {
    this.variant = variant;

    if (id) {
      this.id = id;
    }

    this.category = category;

    if (variant === TypeCard.grid) {
      this.title = new Typography({
        text: title,
        type: 'h6',
      })
    }

    if (variant === TypeCard.list || variant === TypeCard.listCart) {
      this.title = new Typography({
        text: title,
        type: 'body2',
      })
    }

    this.image = image;

    if(variant === TypeCard.grid) {
      this.description = new Typography({
        text: description,
        type: 'body2'
      })
    }

    if(variant === TypeCard.list || variant === TypeCard.listCart) {
      this.description = new Typography({
        text: description,
        type: 'subtitle1'
      })
    }

    if(variant === TypeCard.list || variant === TypeCard.grid) {
      this.price = price
    }

    if(variant === TypeCard.listCart) {
      this.totalPrice = price
    }

    this.buildCardWrapper()
  }

  public get cardWrapper() {
    return this.$cardWrapper;
  }

  public get cardBodyList() {
    return this.$cardBodyList;
  }

  public get footerCardGrid() {
    return this.$footerCardGrid;
  }

  public get footerCardList() {
    return this.$footerCardList;
  }

  public get amountCardWrapList() {
    return this.$amountCardWrapList;
  }

  protected buildCardWrapper = () => {
    const $cardWrapper = document.createElement('div');
    
    if (this.variant === 'grid') {
      $cardWrapper.className = [
        style.cardWrapperGrid,
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
      $cardWrapper.appendChild(this.buildFooterCardGrid());
      $cardWrapper.appendChild(this.buildDescription());
    }

    if (this.variant === 'list' || this.variant === TypeCard.listCart) {
      $cardWrapper.className = [
        'product_wrapper',
        style.cardWrapperList,
        'd-flex',
        'just-content-flex-start',
        'align-items-flex-start',
        'mb-10'
      ].join(' ')
  
      const $columnWrapper = document.createElement('div');
  
      $columnWrapper.className = [
        'product_column_tdp',
        'd-flex',
        'flex-direction-column',
        'just-content-center',
        'align-items-flex-start',
      ].join(' ')

      $columnWrapper.appendChild(this.buildCardBodyList())

      $columnWrapper.appendChild(this.buildFooterCardList())

      $cardWrapper?.appendChild(this.buildImage())

      $cardWrapper?.appendChild($columnWrapper)
    }
  
    this.$cardWrapper = $cardWrapper;
  }

  protected buildFooterCardGrid = () => {
    const $footerCard = document.createElement('div');
  
    $footerCard.className = [
      style.cardProductFooterGrid,
      'd-flex',
      'just-content-space-between',
      'align-items-center',
      'flex-direction-row',
      'gap-10',
    ].join(' ');
    
    $footerCard.appendChild(this.buildPrice());

    this.$footerCardGrid = $footerCard

    return $footerCard;
  }

  protected buildCardBodyList = () => {
    const $bodyWrapper = document.createElement('div');

    $bodyWrapper.className = [
      'product_body',
      'd-flex',
      'just-content-space-between',
      'align-items-flex-start',
      'minhg-10',
      'maxwd-57'
    ].join(' ');

    $bodyWrapper.appendChild(this.buildTitle());

    $bodyWrapper.appendChild(this.buildDescription());

    this.$cardBodyList = $bodyWrapper;

    return $bodyWrapper;
  } 

  protected buildFooterCardList = () =>{
    const $footerWrapper = document.createElement('div');

    $footerWrapper.className = [
      'product_footer',
      'd-flex',
      'just-content-space-between',
      'align-items-center',
      'mb-5',
      'minwd-50'
    ].join(' ');

    const $amountCardWrap = document.createElement('div');

    $amountCardWrap.className = [
      'd-flex',
      'just-content-space-between',
      'align-items-center',
      'gap-5'
    ].join(' ');

    $footerWrapper.appendChild($amountCardWrap);
    $footerWrapper.appendChild(this.buildPrice());

    this.$amountCardWrapList = $amountCardWrap
    this.$footerCardList = $footerWrapper

    return $footerWrapper;
  }

  protected buildTitle = () => {
    const $title = document.createElement('div');

    $title.className = style.cardProductTitle;
      
    if (this.title && this.title.textElement) {
      $title.appendChild(this.title.textElement);
    }
    
    return $title;
  }

  protected buildImage = () => {
    const $imgWrapper = document.createElement('div');

    const $image = document.createElement('img');

    if (this.variant === 'grid') {
      $imgWrapper.className = style.cardProductImgGrid;

      $image.className = style.cardProductImgGrid;
  
      $image.setAttribute('src', `${this.image}`);
      $image.setAttribute('alt', `${this.category}`);

      $imgWrapper.appendChild($image);
    }
  
    if (this.variant === 'list' || this.variant === TypeCard.listCart) {
      $image.className = style.productLogo;
  
      $image.setAttribute('src', `${this.image}`);
      $image.setAttribute('alt', ``);
      $imgWrapper.appendChild($image);
    }
  
    return $imgWrapper;
  }

  protected buildDescription = () => {
    const $description = document.createElement('div');
    
    if (this.variant === 'grid') {
      $description.className = style.cardProductDescriptionGrid;

      if (this.description && this.description.textElement) {
        $description.appendChild(this.description.textElement);
      }
    }

    if (this.variant === 'list' || this.variant === TypeCard.listCart) {
      if (this.description && this.description.textElement) {
        $description.appendChild(this.description.textElement);
      }
    }

    return $description;
  }

  protected buildPrice = () => {
    const $priceWrapper = document.createElement('div');

    $priceWrapper.className = [
      style.cardProductPrice,
      'py-2',
      'px-2',
    ].join(' ');

    if (this.variant === TypeCard.list || this.variant === TypeCard.grid) {
      const $price = new Typography({
        text: this.price,
        type: 'caption'
      })
      if ($price && $price.textElement) {
        $priceWrapper.appendChild($price.textElement);
      }
    }

    if (this.variant === TypeCard.listCart) {
      const productJson = localStorage.getItem(this.id);
      if (productJson) {
        const product = JSON.parse(productJson);
        const $price = new Typography({
          text: product.totalPrice,
          type: 'caption'
        })
        $price.textElement?.setAttribute('id', `price_${this.id}`)
        if ($price && $price.textElement) {
          $priceWrapper.appendChild($price.textElement);
        }
      }
    }

    return $priceWrapper;
  }
}

export default Card;