import Button from '@elements/Button';
import Card from '@elements/Card';
import Snackbar from '@components/Snackbar';
import ProductAPI from '@services/ProductAPI';
import CartAPI from '@services/CartAPI';
import Typography from '@elements/Typography';

import { quantity } from '@utils/getQuantityFromLS';

import style from './style.module.scss'

import { type CardInterface } from "./type"
import { type ProductType } from '@state/ProductState';
import { TypeCard } from '@elements/Card';

class Product extends Card implements CardInterface {
  protected buttonCart: Button;
  protected buttonFavorite: Button;
  protected deleteBtn: Button;
  protected minusBtn: Button;
  protected plusBtn: Button;
  protected textAmount: Typography;
  protected value: string = '1';
  protected productApi: ProductAPI;
  protected cartApi: CartAPI;
  
  constructor(
    variant: TypeCard,
    {
    id,
    category = '',
    title,
    image = '',
    description,
    pricePerUnit
  }: ProductType) {
    super(variant, {id: id, category: category, title: title, image: image, description: description, price: pricePerUnit})

    this.productApi = new ProductAPI();
    this.cartApi = new CartAPI();

    this.buttonFavorite = new Button({
      className: category,
      textContent: {
        type: 'button'
      },
      variant: 'outlined',
      color: 'secondary-light',
      startIcon: {
        iconName: 'heart',
        color: 'secondary-light',
      },
      extraClassName: 'px-3 py-3',
    })

    this.buttonCart = new Button({
      className: category,
      textContent: {
        text: '+',
        type: 'button',
        position: 'up',
        extraClassName: 'pl-2'
      },
      variant: 'outlined',
      color: 'secondary-light',
      startIcon: {
        iconName: 'cart',
        color: 'black',
      },
      extraClassName: 'pl-2 pr-1 py-3',
    })

    this.deleteBtn = new Button({
      textContent: {
        text: 'Delete'
      },
      color: 'secondary-light',
      startIcon: {
        iconName: 'bin',
        color: 'black'
      }
    })

    this.minusBtn = new Button({
      color: 'black',
      startIcon: {
        iconName: 'minus',
        size: 8
      },
      extraClassName: 'mr-2'
    })

    this.plusBtn = new Button({
      color: 'black',
      startIcon: {
        iconName: 'plus',
        size: 8
      },
      extraClassName: 'ml-2'
    })

    this.textAmount = new Typography({
      text: this.value = quantity(this.id),
      type: 'subtitle1',
    })

    this.buildButtonsWrapper()
  }

  protected buildButtonsWrapper = () => {
    if (this.variant === TypeCard.grid) {
      const $footer = super.footerCardGrid;

      if (this.buttonFavorite && this.buttonFavorite.buttonElement && $footer) {
        $footer.appendChild(this.buttonFavorite.buttonElement);
      }
      
      if (this.buttonCart && this.buttonCart.buttonElement && $footer) {
        $footer.appendChild(this.buttonCart.buttonElement);
      }
  
      if (this.buttonCart) {
        this.buttonCart.addEventListener('click', this.handleAddToCart);
      }

      return $footer;
    }

    if (this.variant === TypeCard.list) {
      const $footer = super.footerCardList;

      if (this.buttonFavorite && this.buttonFavorite.buttonElement && $footer) {
        $footer.appendChild(this.buttonFavorite.buttonElement);
      }
      
      if (this.buttonCart && this.buttonCart.buttonElement && $footer) {
        $footer.appendChild(this.buttonCart.buttonElement);
      }
  
      if (this.buttonCart) {
        this.buttonCart.addEventListener('click', this.handleAddToCart);
      }

      return $footer;
    }

    if (this.variant === TypeCard.listCart) {
      const $body = super.cardBodyList;
      const $amountList = super.amountCardWrapList;

      if (this.deleteBtn && this.deleteBtn.buttonElement && $body) {
        $body.appendChild(this.deleteBtn.buttonElement);

        this.deleteBtn.addEventListener('click', this.handleDeleteProduct)
      }

      if (this.minusBtn && this.minusBtn.buttonElement && $amountList) {
        $amountList.appendChild(this.minusBtn.buttonElement);

        this.minusBtn.addEventListener('click', () => {
          if (this.value) {
            const value = parseInt(this.value);
            if (!isNaN(value) && value > 1) {
              this.value = (value - 1).toString();
              this.updateTextAmount();
            }
          }

          this.updateQuantity();
          this.updatePriceListCart();
        })
      }

      if (this.textAmount && this.textAmount.textElement && $amountList) {
        $amountList.appendChild(this.textAmount.textElement);
        this.updateTextAmount()
      }
     
      if (this.plusBtn && this.plusBtn.buttonElement && $amountList) {
        $amountList.appendChild(this.plusBtn.buttonElement);

        this.plusBtn.addEventListener('click', () => {
          if (this.value) {
            let value = parseInt(this.value);
            if (!isNaN(value)) {
              value += 1;
              this.value = value.toString(); 
              this.updateTextAmount();
            }
          }

          this.updateQuantity();
          this.updatePriceListCart();
        })
      }
    }
  }

  protected updateTextAmount() {
    if (this.textAmount && this.textAmount.textElement) {
      this.textAmount.textElement.textContent = this.value;

      if (this.value === '1') {
        this.minusBtn.buttonElement?.setAttribute('disabled', 'disabled')
        this.minusBtn.buttonElement?.classList.add(style.buttonDisabled)
      } else {
        this.minusBtn.buttonElement?.removeAttribute('disabled')
        this.minusBtn.buttonElement?.classList.remove(style.buttonDisabled)
      }

      if (this.value === '10') {
        this.plusBtn.buttonElement?.setAttribute('disabled', 'disabled')
        this.plusBtn.buttonElement?.classList.add(style.buttonDisabled)
      } else {
        this.plusBtn.buttonElement?.removeAttribute('disabled')
        this.plusBtn.buttonElement?.classList.remove(style.buttonDisabled)
      }
    }
  }

  protected updateQuantity = () => {
    const productJson = localStorage.getItem(this.id);

    localStorage.removeItem(this.id);

    if (productJson) {
      const product = JSON.parse(productJson);

      product.quantity = this.value;

      const newProductJson = JSON.stringify(product);

      localStorage.setItem(`${this.id}`, newProductJson);

      this.cartApi.updateQuantity(this.id, product.quantity)
    }
  }

  protected updatePriceListCart = () => {
    const productJson = localStorage.getItem(this.id);

    localStorage.removeItem(this.id);

    if (productJson) {
      const product = JSON.parse(productJson);

      product.totalPrice = String(product.quantity * parseInt(product.pricePerUnit)) + ` грн`;

      const newProductJson = JSON.stringify(product);

      localStorage.setItem(`${this.id}`, newProductJson);

      this.cartApi.updatePrice(this.id, product.totalPrice)
    }
  }

  protected handleAddToCart = () => {
    this.cartApi.addProductToCart(this.id, this.image, this.title.getText(), this.description.getText(), this.price || '0');

    const addedSuccess = new Snackbar({
      message: `Added successfully to cart`,
      variant: 'success'
    })
    addedSuccess.buildSnackbar()
  }

  protected handleDeleteProduct = () => {
    this.cartApi.deleteProductFromCart(this.id);
    
    const deletedSuccess = new Snackbar({
      message: `${this.title.getText()} deleted from cart`,
      variant: 'default'
    })
    deletedSuccess.buildSnackbar()
  }

}

export default Product;