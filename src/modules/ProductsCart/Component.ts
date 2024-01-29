import ProductState from "@state/ProductState";

class ProductsCart {

  public eventTypes: string[] = [
    ProductState.EVENT_TYPE_UPDATE_CART,
    ProductState.EVENT_TYPE_UPDATE_INIT,
  ];

  public displayName: string = 'ProductsCart';

  constructor() {
  }
}

export default ProductsCart;