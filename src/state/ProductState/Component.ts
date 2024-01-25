import Observer from "@services/Observer";

import {
  type ProductStateType,
  type ProductStateInterface,
  type Product
} from "./type";
  
class ProductState extends Observer implements ProductStateInterface{

  static EVENT_TYPE_PRODUCT_LOADING: string = 'EVENT_TYPE_PRODUCT_LOADING';

  static EVENT_TYPE_UPDATE_PRODUCT: string = 'EVENT_TYPE_UPDATE_PRODUCT';

  static EVENT_TYPE_UPDATE_PAGINATION: string = 'EVENT_TYPE_UPDATE_PAGINATION';

  static EVENT_TYPE_UPDATE_INIT: string = 'EVENT_TYPE_UPDATE_INIT';

  static INIT_STATE: ProductStateType = {
    product: [],
    isLoadingProduct: false,
    isInitProduct: false,
    pagination: {
      active: 1,
      elementsAmount: 10,
    },
  }

  protected productState: ProductStateType = ProductState.INIT_STATE;

  constructor() {
    super(ProductState.INIT_STATE)
  }

  public get state() {
    return this.productState;
  }

  public toggleLoaderProduct = (loading: boolean): this => {
    this.state.isLoadingProduct = loading;
    this.notificationObservers(ProductState.EVENT_TYPE_PRODUCT_LOADING);
    return this;
  }

  public updateProduct = async (products: Product[]): Promise<this> => {
    this.state.product = products;
    this.notificationObservers(ProductState.EVENT_TYPE_UPDATE_PRODUCT);
    return this;
  }

  public updatePagination = (active: null | number = null, elementsAmount: null | number = null): this => {
    this.state.pagination = {
      active: active ?? this.state.pagination?.active,
      elementsAmount: elementsAmount ?? this.state.pagination?.elementsAmount,
    };
    this.notificationObservers(ProductState.EVENT_TYPE_UPDATE_PAGINATION);
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

