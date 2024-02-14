import Skeleton from "@elements/Skeleton";
import Product from "@modules/Product";
import ProductState from "@state/ProductState";

import { TypeCard } from "@elements/Card";

import style from "./style.module.scss"

import { $app } from '@constants/div.app';

import { type ListProductsImplements } from "./type";
import { type ProductStateType } from "@state/ProductState";

class ListProducts implements ListProductsImplements {
  protected $listCards: HTMLElement | null = null;

  public eventTypes: string[] = [
    ProductState.EVENT_TYPE_UPDATE_PRODUCT,
    ProductState.EVENT_TYPE_PRODUCT_LOADING,
    ProductState.EVENT_TYPE_UPDATE_INIT,
  ];

  public displayName: string = 'ListCards';

  constructor() {
    this.buildListCards();
  }

  public get listCards() {
    return this.$listCards;
  }

  public productLoading = () => {
    if (this.$listCards) {
      this.$listCards.innerHTML = '';
      const skeleton = new Skeleton();
      const skeletonProduct = skeleton.buildSkeletonProduct(6)
      this.$listCards.appendChild(skeletonProduct)
    }
  }

  public handleEvent = (
    newState: ProductStateType,
    prevState: ProductStateType,
    eventType: string
    ) => {
    if (
      !newState.isInitProduct
      && newState.isLoadingProduct
      && !prevState.isLoadingProduct
      ) {
      this.productLoading();
    }

    if (
      eventType === ProductState.EVENT_TYPE_UPDATE_PRODUCT &&
      newState.isInitProduct ||
      eventType === ProductState.EVENT_TYPE_UPDATE_INIT
    ) {
      if (this.$listCards){
        this.$listCards.innerHTML = '';

        const productData = newState.product;
        
        productData?.forEach(product => {
          const products = new Product(TypeCard.grid, product);
          if (this.$listCards && products.cardWrapper) {
            this.$listCards.appendChild(products.cardWrapper);
          }
        })
      }
    }
  }

  protected buildListCards = () => {
    const $listCards = document.createElement('div');
    
    $listCards.className = [
      style.listProducts,
      'd-flex',
      'just-content-center',
      'flex-wrap-wrap',
      'flex-direction-row',
      'px-2',
      'py-2',
      'mx-2',
      'my-2',
    ].join(' ');

     this.$listCards = $listCards;

    if (this.$listCards && $app) {
      $app.appendChild(this.$listCards);
    }
  }
}

export default ListProducts;