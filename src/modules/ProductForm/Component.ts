import InputText from "@components/InputText";
import Validations from "@services/Validations";
import Button from "@elements/Button";
import ProductAPI from "@services/ProductAPI";
import Snackbar from "@components/Snackbar";
import Skeleton from "@elements/Skeleton";

import styleSkeleton from "@elements/Skeleton/style.module.scss"

import { type ProductFormImplements } from "./type";
import { type ValidationFunction } from "@services/Validations";

class ProductForm implements ProductFormImplements{
  protected $formBody: HTMLElement | null = null;

  public get formProduct() {
    return this.$formBody;
  }

  public buildProductForm = (): HTMLFormElement => {
    const $formBody = document.createElement('form');

    $formBody.addEventListener('submit', (event) => this.submitForm(event));

    this.addFormInput($formBody, 'category', 'Category*', 'text', 'Category', 'categoryInput', [Validations.required()]);

    this.addFormInput($formBody, 'title', 'Title*', 'text', 'Title', 'titleInput', [Validations.required()]);

    this.addFormInput($formBody, 'image', 'Image url*', 'text', 'Image url', 'imageInput', [Validations.required(), Validations.url()]);

    this.addFormInput($formBody, 'description', 'Description*', 'text', 'Description', 'descriptionInput', [Validations.required()]);

    this.addFormInput($formBody, 'price', 'Price*', 'text', '1000', 'priceInput', [Validations.required(), Validations.notZero(), Validations.onlyNumbers()]);

    $formBody.appendChild(this.buildFormButtons());
   
    this.$formBody = $formBody;

    return $formBody;
  }

  private addFormInput = ($formBody: HTMLFormElement, name: string, label: string, type: string, placeholder: string, id: string, validations: ValidationFunction[]): void => {
      const $input = new InputText({
          name: name,
          label: label,
          type: type,
          placeholder: placeholder,
          id: id
      });

      validations.forEach(validation => $input.addValidation(validation));

      if ($input.inputWrapper) {
          $formBody.appendChild($input.inputWrapper);
      }
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

  protected getFormData = () => {
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

      return { category, title, image, description, price };
    } else {
      return null;
    }
  }

  protected submitForm = async (event: Event): Promise<void> => {
    event.preventDefault(); 

    const formData = this.getFormData();

    const onlyNumbersRegex = /^\d+$/;

    if (formData) {
      const { category, title, image, description, price } = formData;

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
  
          const $modal = document.getElementById('modal_wrapper');
          $modal?.remove();
  
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