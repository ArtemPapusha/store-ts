import endpoint from '@utils/endpoint';
import {
  PRODUCTS_ROUTER,
  PRODUCT_ID_ROUTER,
  API_HOST,
  API_METHOD_GET,
} from '@constants/api';

import {
  type ProductStateInstantsType,
  type ProductsResponse
} from './type';


class ProductAPI {
  static productsEndpoint = () => endpoint(API_METHOD_GET, PRODUCTS_ROUTER);

  static productIdEndpoint = (id: number) => endpoint(API_METHOD_GET, PRODUCT_ID_ROUTER(id));

  protected productState: ProductStateInstantsType;

  constructor(productState: ProductStateInstantsType) {
    this.productState = productState;
  }

  public getProducts = async (page: number): Promise<void> => {
    const { endpoint, url, method } = ProductAPI.productsEndpoint();
    const { 
      state,
      toggleLoaderProduct,
      updateProduct,
      updatePagination,
      setInitProduct
    } = this.productState

    toggleLoaderProduct(true);

    try {
      const response = await fetch(`${API_HOST}${url}?_page=${page}`, { method });

      const { data, items }: ProductsResponse = await response.json();
      updatePagination(page, items)
      updateProduct(data)
    } catch (error) {
    
      console.log('getProducts => error', error);

    } finally {
      if (!state.isInitProduct) {
        setInitProduct();
      }

      toggleLoaderProduct(false);

      console.log('getProducts => finally', endpoint);
    }
  }

}

export default ProductAPI;