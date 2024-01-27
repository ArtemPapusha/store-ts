  import {
    type Product
  } from "@state/ProductState";
  

  export interface ProductsResponse {
    data: Product[],
    first: number,
    prev: number,
    next: number,
    last: number,
    ages: number,
    items: number,
    pages: number,
  }
