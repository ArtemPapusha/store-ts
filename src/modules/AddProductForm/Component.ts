import ProductForm from "@modules/ProductForm";
import Modal from "@components/Modal";
import Button from "@elements/Button";
import Typography from "@elements/Typography";

import { $app } from "@constants/div.app";

const modal = new Modal();
const productForm = new ProductForm();

class AddProductForm{
protected $addProductButton: HTMLElement | null = null;

  constructor() {
    this.addProductButton()
  }

  protected titleProductForm = () => {
    const $title = new Typography({
      text: 'Add a new product',
      type: 'h6',
      textColor: 'black',
      textWeight: 700,
      extraClassName: 'ml-5'
    }).textElement

    return $title;
  }

  protected addProductButton = () => {
    const $buttonWrapper = document.createElement('div')

    const $button = new Button({
      textContent: {
        text: 'Add product',
        type: 'body2'
      },
      variant: 'outlined',
      buttonSize: 'small',
      startIcon: {
        iconName: 'plus',
        color: 'black',
        extraClassName: 'mr-2'
      },
      extraClassName: 'px-2 py-2'
    });

    if ($button.buttonElement) {
    $buttonWrapper.appendChild($button.buttonElement)
    }

    $button.addEventListener('click', () => {
      modal.openModal(this.titleProductForm(), productForm.buildProductForm(), null);
    })

    $app?.appendChild($buttonWrapper)
  }
}

export default AddProductForm;