import Skeleton from "@elements/Skeleton";
import CardProduct from "@components/CardProduct";
import ProductState from "@state/ProductState";

import flex from "@style/utils/flex.module.scss"

import { type ListProductsImplements } from "./type";

import {
  type ProductStateType
} from "@state/ProductState";

class ListProducts implements ListProductsImplements{
  protected $listCards: HTMLElement | null = null;

  eventTypes = [
    ProductState.EVENT_TYPE_UPDATE_PRODUCT,
    ProductState.EVENT_TYPE_PRODUCT_LOADING,
    ProductState.EVENT_TYPE_UPDATE_INIT,
  ];

  displayName = 'ListCards';

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
      const skeletonProduct = skeleton.buildSkeletonProduct(10)
      this.$listCards.appendChild(skeletonProduct)
    }
  }

  handleEvent = (
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
      console.log('ListCards => products', newState.product?.length);
      if (this.$listCards){
        this.$listCards.innerHTML = '';

        const productData = newState.product;
  
        productData?.forEach(product => {
          const cardProduct = new CardProduct(product);
          if (this.$listCards && cardProduct.cardWrapper) {
            this.$listCards.appendChild(cardProduct.cardWrapper);
          }
        })
      }
    }

  }

  protected buildListCards = () => {
    const $listCards = document.createElement('div');
    
    $listCards.className = [
      flex[`d-flex`],
      flex[`just-content-center`],
      flex[`flex-wrap-wrap`],
      flex[`flex-direction-row`],
    ].join(' ');
    
    // 'list-products d-flex flex-direction-row just-content-center flex-wrap-wrap';

     this.$listCards = $listCards;

    if (this.$listCards) {
      document.body.appendChild(this.$listCards);
    }
  }
}

export default ListProducts;