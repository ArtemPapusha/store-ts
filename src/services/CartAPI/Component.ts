import ProductState, { type ProductStateInterface } from '@state/ProductState';

class CartAPI {
  protected productState: ProductStateInterface;

  constructor() {
    this.productState = new ProductState();
  }

  public getProductForCart = () => {
    const { updateCart } = this.productState

    const amount = String(this.updateCartLocalStorage().length)

    updateCart(this.updateCartLocalStorage(), amount)
  }

  public deleteProductFromCart = async (id: string): Promise<void> => {
    const { updateCart } = this.productState

    localStorage.removeItem(`${id}`);

    const amount = String(this.updateCartLocalStorage().length)

    updateCart(this.updateCartLocalStorage(), amount)
  }

  public addProductToCart = (id: string, logo: string, title: string, descript: string, price: string) => {
    const { updateCart } = this.productState
    const product = {id: id, image: logo, title: title, description: descript, pricePerUnit: price, quantity: '1', totalPrice: price}
    localStorage.setItem(`${id}`, JSON.stringify(product))

    const amount = String(this.updateCartLocalStorage().length)

    updateCart(this.updateCartLocalStorage(), amount)
  }

  public updateQuantity = (id: string, quantity: string) => {
    const { updateCart } = this.productState
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
  }

  public updatePrice = (id: string, totalPrice: string) => {
    const { updateCart } = this.productState
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
  }

  public updateCartLocalStorage = () => {
    const productData = Object.keys(localStorage)
    const productsArr: any[] = [];
    
    productData.forEach(products => {
      const productJson = localStorage.getItem(products)
      
      if (productJson) {
      const product = JSON.parse(productJson)
        
      productsArr.push(product);
      }
    })

    return productsArr;
  }
}

export default CartAPI;