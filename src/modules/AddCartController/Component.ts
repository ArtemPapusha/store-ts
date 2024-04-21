import Modal from "@components/Modal";
import Button from "@elements/Button";
import Typography from "@elements/Typography";
import ProductCart from "@modules/ProductCart";
import ProductState from "@state/ProductState"
import Product from "@modules/Product";
import Skeleton from '@elements/Skeleton';

import { type ProductStateType } from "@state/ProductState";
import { TypeCard } from "@elements/Card";

import { $app } from "@constants/div.app";

class AddCartController {
  protected productCart: ProductCart;
  protected modal: Modal;
  protected cartLoader: Skeleton;
  protected $addCartButton: HTMLElement | null = null;
  protected amount: string | undefined;
  protected totalPrice: number = 0;

  public eventTypes: string[] = [
    ProductState.EVENT_TYPE_UPDATE_CART,
    ProductState.EVENT_TYPE_PRODUCT_LOADING,
    ProductState.EVENT_TYPE_UPDATE_INIT,
  ];

  public displayName: string = 'ProductCart';

  constructor() {
    this.modal = new Modal()
    this.productCart = new ProductCart();
    this.cartLoader = new Skeleton();

    this.addProductCart();
  }

  protected titleCart = () => {
    return new Typography({
      text: 'Cart',
      type: 'h5',
      textColor: 'black',
      extraClassName: 'ml-5'
    }).textElement
  }

  protected addProductCart = () => {
    const $buttonWrapper = document.createElement('div')

    const $button = new Button({
      textContent: {
        text: '',
        position: 'up',
        type: 'caption',
        extraClassName: 'pl-2'
      },
      variant: 'outlined',
      buttonSize: 'small',
      startIcon: {
        iconName: 'cart',
        color: 'black',
      },
      extraClassName: 'pl-2 pr-1 py-2 my-2'
    });

    $button.setAttribute('id', 'cartController')

    if ($button.buttonElement) {
      $buttonWrapper.appendChild($button.buttonElement)
    }

    $button.addEventListener('click', () => {
      this.modal.openModal(this.titleCart(), this.productCart.productCart, this.productCart.cartFooter(this.totalPrice));
    })

    $app?.appendChild($buttonWrapper)
  }

  public handleEvent = (
    newState: ProductStateType,
    prevState: ProductStateType,
    eventType: string
    ) => {
    if (eventType === ProductState.EVENT_TYPE_UPDATE_CART) {
      this.amount = newState.cartCounter;

      if (this.amount) {
        this.updateCartCounter(this.amount)
      }
      
      if (this.productCart.productCart) {
        this.productCart.productCart.innerHTML = ''
        const products = newState.cart

        this.updateCartContent(products);
        
        this.updateTotalPrice(products);
      }
    }
  }

  protected updateCartContent = (products: any[]) => {
    if (Array.isArray(products)) {
      products.forEach(product => {
        const cartProduct = new Product(TypeCard.listCart, product);

        if (cartProduct.cardWrapper) {
          this.productCart.productCart?.appendChild(cartProduct.cardWrapper)
        }
      })
    }
  }
  
  protected updateCartCounter = (amount: string) => {
    const button = document.getElementById('cartController')
    const amountText = button?.getElementsByTagName('span')[0];
    
    if (amountText) {
      if (amount !== undefined && amount !== '0') {
        amountText.innerText = amount;
      } else {
        amountText.innerText = '';
      }
    }
  }

  protected updateTotalPrice(products: any[]) {
    this.totalPrice = products.reduce((total, product) => {
      if (product.totalPrice && typeof product.totalPrice === 'string' && product.totalPrice.trim() !== '') {
        return total + parseFloat(product.totalPrice);
      } else {
        return total;
      }
    }, 0);

    const totalPriceElement = document.getElementById('total_price');
    
    if (totalPriceElement) {
      totalPriceElement.innerText = `Total price: ${this.totalPrice} грн`;
    }
  }
}

export default AddCartController;