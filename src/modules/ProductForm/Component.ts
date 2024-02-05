import InputText from "@components/InputText";
import Validations from "@services/Validations";
import Modal from "@components/Modal";
import Button from "@elements/Button";
import ProductAPI from "@services/ProductAPI";
import Snackbar from "@components/Snackbar";
import Skeleton from "@elements/Skeleton";

import styleSkeleton from "@elements/Skeleton/style.module.scss"

import { type ProductFormImplements } from "./type";

const modal = new Modal()

class ProductForm implements ProductFormImplements{
  protected $formBody: HTMLElement | null = null;

  public get formProduct() {
    return this.$formBody;
  }

  public buildProductForm = (): HTMLFormElement => {
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
      type: 'text',
      placeholder: 'Image url',
      id: 'imageInput'
    })
    .addValidation(Validations.required())
    .addValidation(Validations.url());

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
      type: 'text',
      placeholder: '1000',
      id: 'priceInput'
    })
    .addValidation(Validations.required())
    .addValidation(Validations.notZero())
    .addValidation(Validations.onlyNumbers());
  
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

    $formBody.appendChild(this.buildFormButtons());
   
    this.$formBody = $formBody;

    return $formBody;
  }

  protected buildFormButtons = () => {
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
      'just-content-center',
      'gap-5'
    ].join(' ')

    if ($reset.buttonElement) {
      $buttonsWrapper.appendChild($reset.buttonElement)
    }

    if ($submit.buttonElement) {
      $buttonsWrapper.appendChild($submit.buttonElement)
    }

    return $buttonsWrapper;
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
      categoryInput
      && titleInput
      && imageInput
      && descriptionInput
      && priceInput
    ) {
      const category = categoryInput.value;
      const title = titleInput.value;
      const image = imageInput.value;
      const description = descriptionInput.value;
      const price = parseFloat(priceInput.value);

      const onlyNumbersRegex = /^\d+$/;
      
      if (
        category
        && title
        && image
        && description
        && price
        && price > 0
        ) {
          const $iconSend = this.$formBody?.querySelector('._icon-compass_1s6ri_315');
          $iconSend?.remove();
          
          this.buttonLoader();
          
          const res = await ProductAPI.createProduct(category, title, image, description, price);
          
          this.removeButtonLoader();

          modal.closeModal();

          const notification = new Snackbar({
            message: `Product was added with id ${res?.id}`,
            variant: 'info'
          });

          notification.buildSnackbar();
      } else if(
        !category
        && !title
        && !image
        && !description
        && !price
      ){
        const notification = new Snackbar({
          message: "All fields are required",
          variant: 'info'
        });

        notification.buildSnackbar();
      } else if (!onlyNumbersRegex.test(String(price)) || price <= 0) {
        
        const notification = new Snackbar({
          message: 'Price value is not correct',
          variant: 'info'
        });

        notification.buildSnackbar();
      } 
    }
  }
}

export default ProductForm;