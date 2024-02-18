  import { type ProductType, type CartType } from "@state/ProductState";

  export interface ProductsResponse {
    data: ProductType[] | CartType[],
    first: number,
    prev: number,
    next: number,
    last: number,
    items: number,
    pages: number,
  }
