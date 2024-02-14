export interface ProductType {
  id?: string,
  category?: string,
  title?: string,
  image?: string,
  description?: string,
  pricePerUnit?: string,
}

export interface CartType {
  id?: string,
  category?: string,
  title?: string,
  image?: string,
  description?: string,
  price?: string,
  quantity?: string
}

export interface ProductStateInterface  {
  state: ProductStateType,
  toggleLoaderProduct: (loading: boolean) => this,
  updateProduct: (products: ProductType[]) => Promise<this>,
  updatePagination: (active?: number | null, pagesAmount?: number | null) => this,
  setInitProduct: () => this,
  updateCart: (products: CartType[], amount: string) => Promise<this>,
}

export interface ProductStateType {
  product: ProductType[]
  cart: CartType[],
  cartCounter: string | undefined
  isLoadingProduct: boolean
  isInitProduct: boolean
  pagination: {
      active: number,
      pagesAmount: number,
  }
}