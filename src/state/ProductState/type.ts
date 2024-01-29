export interface Product {
  id?: number,
  category?: string,
  title?: string,
  image?: string,
  description?: string,
  price?: number,
}

export interface ProductStateInterface  {
  state: ProductStateType,
  toggleLoaderProduct: (loading: boolean) => this,
  updateProduct: (products: Product[]) => Promise<this>,
  updatePagination: (active?: number | null, pagesAmount?: number | null) => this,
  setInitProduct: () => this,
  updateCart: (products: Product[]) => Promise<this>,
}

export interface ProductStateType {
  product: Product[],
  cart: Product[],
  isLoadingProduct: boolean,
  isInitProduct: boolean,
  pagination: {
      active: number,
      pagesAmount: number,
  }
}