import Observer from "@services/Observer";

import { getPageNumber } from "@utils/urls";

import {
  type ProductStateType,
  type ProductStateInterface,
  type ProductType,
  type CartType
} from "./type";
  
class ProductState extends Observer<ProductStateType> implements ProductStateInterface{
  protected static instance: ProductState | null = null;

  static EVENT_TYPE_PRODUCT_LOADING: string = 'EVENT_TYPE_PRODUCT_LOADING';

  static EVENT_TYPE_UPDATE_PRODUCT: string = 'EVENT_TYPE_UPDATE_PRODUCT';

  static EVENT_TYPE_UPDATE_PAGINATION: string = 'EVENT_TYPE_UPDATE_PAGINATION';

  static EVENT_TYPE_UPDATE_INIT: string = 'EVENT_TYPE_UPDATE_INIT';

  static EVENT_TYPE_UPDATE_CART: string = 'EVENT_TYPE_UPDATE_CART';

  static INIT_STATE: ProductStateType = {
    product: [],
    cart: [],
    cartCounter: undefined,
    isLoadingProduct: false,
    isInitProduct: false,
    pagination: {
      active: getPageNumber() || 1,
      pagesAmount: 1,
    },
  }

  constructor() {
    super(ProductState.INIT_STATE)
    if (ProductState.instance && typeof ProductState.instance === "object") {
      return ProductState.instance
    }

    ProductState.instance = this
    return this
  }

  protected _state: ProductStateType = ProductState.INIT_STATE;

  public get state() {
    return this._state;
  }

  public toggleLoaderProduct = (loading: boolean): this => {
    this.state.isLoadingProduct = loading;
    this.notificationObservers(ProductState.EVENT_TYPE_PRODUCT_LOADING);
    return this;
  }

  public updateProduct = async (products: ProductType[]): Promise<this> => {    
    this.state.product = products;
    this.notificationObservers(ProductState.EVENT_TYPE_UPDATE_PRODUCT);
    return this;
  }

  public updatePagination = (
    active: null | number = null,
    pagesAmount: null | number = null
    ): this => {
    this.state.pagination = {
      active: active ?? this.state.pagination?.active,
      pagesAmount: pagesAmount ?? this.state.pagination?.pagesAmount,
    };
    this.notificationObservers(ProductState.EVENT_TYPE_UPDATE_PAGINATION);
    return this;
  }

  public updateCart = async (products: CartType[], amount: string): Promise<this> => {
    this.state.cart = products;
    this.state.cartCounter = amount;
    this.notificationObservers(ProductState.EVENT_TYPE_UPDATE_CART);
    return this;
  }

  public setInitProduct = (): this => {
    if (!this.state.isInitProduct) {
      this.state.isInitProduct = true;
      this.notificationObservers(ProductState.EVENT_TYPE_UPDATE_INIT)
    }
    return this;
  }
}

export default ProductState;

