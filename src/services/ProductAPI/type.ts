  import {
    type ProductStateType,
    type Product
  } from "@state/ProductState";
  
  export interface ProductStateInstantsType {
    state: ProductStateType,
    toggleLoaderProduct: (loading: boolean) => void,
    updateProduct: (product: Product[]) => void,
    updatePagination: (active?: number | null, amount?: number | null) => void,
    setInitProduct: () => void,
  }

  export interface ProductsResponse {
    data: Product[],
    first: number,
    prev: number,
    next: number,
    last: number,
    ages: number,
    items: number,
  }
