import ProductState, { type ProductStateInterface } from '@state/ProductState';

class CartAPI {
  protected productState: ProductStateInterface;

  constructor() {
    this.productState = new ProductState();
  }

  public getProductForCart = () => {
    const { 
      state,
      setInitProduct,
      updateCart
    } = this.productState

    const productData = Object.keys(localStorage)
    const productsArr: any[] = [];
    
    productData.forEach(products => {
      const productJson = localStorage.getItem(products)
      
      if (productJson) {
      const product = JSON.parse(productJson)
        
      productsArr.push(product);
      }
    })
    const amount = String(productsArr.length)
    updateCart(productsArr, amount)
    if (!state.isInitProduct) {
      setInitProduct();
    }
  }

  public deleteProductFromCart = async (id: string): Promise<void> => {
    const { 
      state,
      setInitProduct,
      updateCart
    } = this.productState

    localStorage.removeItem(`${id}`);

    const productData = Object.keys(localStorage)
    const productsArr: any[] = [];
    
    productData.forEach(products => {
      const productJson = localStorage.getItem(products)
      
      if (productJson) {
      const product = JSON.parse(productJson)
      productsArr.push(product);
      }
    })
    const amount = String(productsArr.length)
    updateCart(productsArr, amount)
    if (!state.isInitProduct) {
      setInitProduct();
    }
  }

  public addProductToCart = (id: string, logo: string, title: string, descript: string, price: string) => {
    const { 
      state,
      updateCart,
      setInitProduct
    } = this.productState
    const product = {id: id, image: logo, title: title, description: descript, pricePerUnit: price, quantity: '1', totalPrice: price}
    localStorage.setItem(`${id}`, JSON.stringify(product))

    const productData = Object.keys(localStorage)
    const productsArr: any[] = [];
    
    productData.forEach(products => {
      const productJson = localStorage.getItem(products)
      
      if (productJson) {
      const product = JSON.parse(productJson)
      productsArr.push(product);
      }
    })
    const amount = String(productsArr.length)
    updateCart(productsArr, amount)
    if (!state.isInitProduct) {
      setInitProduct();
    }
  }

  public updateQuantity = (id: string, quantity: string) => {
    const { 
      state,
      setInitProduct,
      updateCart
    } = this.productState
    const productData = Object.keys(localStorage)
    const productsArr: any[] = [];
    
    productData.forEach(products => {
      const productJson = localStorage.getItem(products)
      
      if (productJson) {
      const product = JSON.parse(productJson)
      
      if (id === product.id) {
        product.quantity = quantity
      }

      productsArr.push(product);
      }
    })
    const amount = String(productsArr.length)
    updateCart(productsArr, amount)
    if (!state.isInitProduct) {
      setInitProduct();
    }
  }

  public updatePrice = (id: string, totalPrice: string) => {
    const { 
      state,
      setInitProduct,
      updateCart
    } = this.productState
    const productData = Object.keys(localStorage)
    const productsArr: any[] = [];
    
    productData.forEach(products => {
      const productJson = localStorage.getItem(products)
      
      if (productJson) {
      const product = JSON.parse(productJson)
      
      if (id === product.id) {
        product.totalPrice = totalPrice
      }

      productsArr.push(product);
      }
    })
    const amount = String(productsArr.length)
    updateCart(productsArr, amount)
    if (!state.isInitProduct) {
      setInitProduct();
    }
  }
}

export default CartAPI;