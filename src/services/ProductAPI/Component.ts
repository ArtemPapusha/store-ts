import endpoint from '@utils/endpoint';
import {
  PRODUCTS_ROUTER,
  PRODUCT_ID_ROUTER,
  API_HOST,
  API_METHOD_GET,
} from '@constants/api';

import {
  type ProductsResponse
} from './type';

import { type ProductStateInterface } from '@state/ProductState';


class ProductAPI {
  static productsEndpoint = () => endpoint(API_METHOD_GET, PRODUCTS_ROUTER);

  static productIdEndpoint = (id: number) => endpoint(API_METHOD_GET, PRODUCT_ID_ROUTER(id));

  protected productState: ProductStateInterface;

  constructor(productState: ProductStateInterface ) {
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
      const response = await fetch(`${API_HOST}${url}?_page=${page}&_per_page=5`, { method });

      const { data, pages }: ProductsResponse = await response.json();
      updatePagination(page, pages)
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

  public getProduct = async (id: number): Promise<void> => {
    const { endpoint, url, method } = ProductAPI.productIdEndpoint(id);
    const { 
      state,
      updateCart,
      setInitProduct
    } = this.productState

    try {
      const response = await fetch(`${API_HOST}${url}`, { method });

      const { data }: ProductsResponse = await response.json();

      updateCart(data);

    } catch (error) {
    
      console.log('getProducts => error', error);

    } finally {
      if (!state.isInitProduct) {
        setInitProduct();
      }

      console.log('getProducts => finally', endpoint);
    }
  }

}

export default ProductAPI;