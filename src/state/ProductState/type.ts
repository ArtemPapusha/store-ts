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
  toggleLoaderProduct: (loading: boolean) => void,
  updateProduct: (product: Product[]) => void,
  updatePagination: (active?: number | null, amount?: number | null) => void,
  setInitProduct: () => void,
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