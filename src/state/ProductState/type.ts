export interface Product {
  id?: number,
  name?: string,
  title?: string,
  image?: string,
  description?: string,
  price?: number,
}

export interface ProductStateInterface  {
  state: ProductStateType,
  toggleLoaderProduct: (loading: boolean) => this,
  updateProduct: (product: Product[]) => Promise<this>,
  updatePagination: (active?: number | null, amount?: number | null) => this,
  setInitProduct: () => this,
}

export interface ProductStateType {
  product: Product[],
  isLoadingProduct: boolean,
  isInitProduct: boolean,
  pagination: {
      elementsAmount: number,
      active: number,
  }
}