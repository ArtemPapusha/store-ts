import InputText from "@components/InputText";
import Validations from "@services/Validations";
import Modal from "@components/Modal";
import Button from "@elements/Button";
import ProductAPI from "@services/ProductAPI";
import Snackbar from "@components/Snackbar";
import Skeleton from "@elements/Skeleton";

import styleSkeleton from "@elements/Skeleton/style.module.scss"

import { $divApp } from "@constants/div.app";

import {
  type AddProductFormImplements
} from "./type";

class AddProductForm extends Modal implements AddProductFormImplements{
  protected $formBody: HTMLElement | null = null;

  constructor() {
    super({
      title: 'Add new product to the store',
    });

    this.addProductButton()
  }

  public get formProduct() {
    return this.$formBody;
  }

  protected buildProductForm = (): HTMLFormElement => {
    const $formBody = document.createElement('form');

    $formBody.addEventListener('submit', (event) => this.submitForm(event));

    const $category = new InputText({
      name: 'category',
      label: 'Category*',
      type: 'text',
      placeholder: 'Category',
      id: 'categoryInput'
    }).addValidation(Validations.required());

    const $title = new InputText({
      name: 'title',
      label: 'Title*',
      type: 'text',
      placeholder: 'Title',
      id: 'titleInput'
    }).addValidation(Validations.required());

    const $image = new InputText({
      name: 'image',
      label: 'Image url*',
      type: 'url',
      placeholder: 'Image url',
      id: 'imageInput'
    }).addValidation(Validations.required()).addValidation(Validations.url());

    const $description = new InputText({
      name: 'description',
      label: 'Description*',
      type: 'text',
      placeholder: 'Description',
      id: 'descriptionInput'
    }).addValidation(Validations.required());

    const $price = new InputText({
      name: 'price',
      label: 'Price*',
      type: 'number',
      placeholder: '1000',
      id: 'priceInput'
    })
    .addValidation(Validations.required());

    const $submit = new Button({
      textContent: {
        text: 'Send',
        textColor: 'white',
        extraClassName: 'pr-2'
      },
      variant: 'contained',
      color: 'success',
      endIcon: {
        iconName: 'compass',
        color: 'white',
        extraClassName: 'mr-2'
      },
      extraClassName: 'px-2'
    })

    $submit.setAttribute('type', 'submit')

    const $reset = new Button({
      textContent: {
        text: 'Reset',
        textColor: 'white'
      },
      variant: 'contained',
      color: 'success',
      endIcon: {
        iconName: 'spinner11',
        color: 'white',
        extraClassName: 'mx-2'
      },
      extraClassName: 'px-2'
    })

    $reset.setAttribute('type', 'reset')

    const $buttonsWrapper = document.createElement('div');

    $buttonsWrapper.className = [
      'd-flex',
      'gap-5'
    ].join(' ')

    if ($reset.buttonElement) {
      $buttonsWrapper.appendChild($reset.buttonElement)
    }

    if ($submit.buttonElement) {
      $buttonsWrapper.appendChild($submit.buttonElement)
    }
  
    if ($category.inputWrapper) {
      $formBody.appendChild($category.inputWrapper)
    }

    if ($title.inputWrapper) {
      $formBody.appendChild($title.inputWrapper)
    }

    if ($image.inputWrapper) {
      $formBody.appendChild($image.inputWrapper)
    }

    if ($description.inputWrapper) {
      $formBody.appendChild($description.inputWrapper)
    }

    if ($price.inputWrapper) {
      $formBody.appendChild($price.inputWrapper)
    }

    $formBody.appendChild($buttonsWrapper);
   
    this.$formBody = $formBody;

    return $formBody;
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
      this.openModal(this.buildProductForm());
    })

    $divApp?.appendChild($buttonWrapper)
  }

  protected buttonLoader = () => {
    const $buttonSubmit = this.$formBody?.querySelector('button[type=submit]');
    const $buttonLodaer = new Skeleton().buildLoadingButton();
    $buttonSubmit?.appendChild($buttonLodaer)
  }

  protected removeButtonLoader = () => {
    const $buttonLoader = document.querySelector(`.${styleSkeleton.spinLoader}`)
    
    if ($buttonLoader) {
      $buttonLoader.remove()
    }
  }

  protected submitForm = async (event: Event): Promise<void> => {
    event.preventDefault(); 

    const categoryInput = document.getElementById('categoryInput') as HTMLInputElement | null;
    const titleInput = document.getElementById('titleInput') as HTMLInputElement | null;
    const imageInput = document.getElementById('imageInput') as HTMLInputElement | null;
    const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement | null;
    const priceInput = document.getElementById('priceInput') as HTMLInputElement | null;
  
    if (
      categoryInput &&
      titleInput &&
      imageInput &&
      descriptionInput &&
      priceInput
    ) {
      const category = categoryInput.value;
      const title = titleInput.value;
      const image = imageInput.value;
      const description = descriptionInput.value;
      const price = parseFloat(priceInput.value);

      if (
        category
        && title
        && image
        && description
        && price
        ) {
          const $iconSend = this.$formBody?.querySelector('._icon-compass_1s6ri_315');
          $iconSend?.remove();
          
          this.buttonLoader();
          
          const res = await ProductAPI.createProduct(category, title, image, description, price);
          
          this.removeButtonLoader();

          this.closeModal();
          const notification = new Snackbar({
            message: `Product was added with id ${res?.id}`,
            variant: 'info'
          });

          notification.buildSnackbar();
      } else {
        const notification = new Snackbar({
          message: "All fields are required",
          variant: 'info'
        });
        notification.buildSnackbar();
      }
    }
  }
}
export default AddProductForm;