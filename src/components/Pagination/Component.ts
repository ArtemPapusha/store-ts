import Icon from '@elements/Icon';
import Skeleton from '@elements/Skeleton';

import style from './style.module.scss'
import styleSkeleton from "@elements/Skeleton/style.module.scss"

import {
  type Color,
  type IconName
} from "@type/app"

import {
  type PaginationInterface,
  type PaginationConstructor,
} from "./type"

class Pagination implements PaginationInterface{
  protected static DEFAULT_PAGE_COUNT = 5;

  protected static types = {
    first: 'first',
    arrowLeft: 'arrow-left',
    arrowRight: 'arrow-right',
    last: 'last',
    dotsLeft: 'dots-left',
    dotsRight: 'dots-right',
    page: 'page'
  }

  protected $paginationContainer: HTMLElement | null = null;
  protected activePage: number;
  protected pagesAmount: number;
  protected variant: string = 'text';
  protected color: Color | null= 'black';
  protected textColor: Color | null= 'black';
  protected size: string = '';
  protected handlePageClick: (page: number | null) => void;

  constructor({
    active,
    pagesAmount,
    variant = 'text',
    color = 'black',
    textColor = null,
    size = ''
  }: PaginationConstructor) {
    this.activePage = active;
    this.pagesAmount = pagesAmount;
    this.variant = variant;
    this.color = color;
    this.textColor = textColor;
    this.size = size;

    this.buildPagination();
  }

  public get pagination() {
    return this.$paginationContainer;
  }

  public setPageClick = (handlePageClicker: (page: number | null) => void) => {
    this.handlePageClick = handlePageClicker;

  }

  public handleChangeActivePage = (page: number, pagesAmount: number) => {
    this.activePage = page;
    this.pagesAmount = pagesAmount;

    this.buildPagination();
  }

  public setDisabled = () => {
    if (this.$paginationContainer) {
      const $paginationItems = this.$paginationContainer.querySelectorAll(`.${style['pagination_item']}`);
      console.log(this.$paginationContainer);
      
      if ($paginationItems.length > 0) {
        $paginationItems.forEach(($paginationItem) => {
          if ($paginationItem) {
            $paginationItem.setAttribute('disabled', 'disabled');
            $paginationItem.classList.add(style['pagination_item--disabled'])
          }
        });
      }
    }
  };

  protected preBuildingPagination = () => {
    const items = [];

    items[0] =  {
      type: Pagination.types.first,
      isDisabled: this.activePage === 1,
    };
    items[1] =  {
      type: Pagination.types.arrowLeft,
      isDisabled: this.activePage === 1,
    };

    if (this.pagesAmount > Pagination.DEFAULT_PAGE_COUNT && this.activePage > Pagination.DEFAULT_PAGE_COUNT) {
      items[(items.length - 1) + 1] =  {
          type: Pagination.types.dotsLeft,
          isDisabled: true,
      };
    }

    if (this.pagesAmount <= Pagination.DEFAULT_PAGE_COUNT) {
      for (let i = 1; i < this.pagesAmount + 1; i++) {
          items[(items.length - 1) + 1] =  {
              type: Pagination.types.page,
              value: i,
              isActive: this.activePage === i,
          };
      }
    }

    if (this.pagesAmount > Pagination.DEFAULT_PAGE_COUNT && this.activePage <= Pagination.DEFAULT_PAGE_COUNT) {
      for (let i = 1; i < Pagination.DEFAULT_PAGE_COUNT + 1; i++) {
          items[(items.length - 1) + 1] =  {
              type: Pagination.types.page,
              value: i,
              isActive: this.activePage === i,
          };
      }
    }

    if (
      this.pagesAmount > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage >= (this.pagesAmount - Pagination.DEFAULT_PAGE_COUNT)
      ) {
      for (
          let i = this.pagesAmount - Pagination.DEFAULT_PAGE_COUNT;
          i < this.pagesAmount + 1;
          i++
      ) {
          items[(items.length - 1) + 1] =  {
              type: Pagination.types.page,
              value: i,
              isActive: this.activePage === i,
          };
      }
    }

    if (
      this.pagesAmount > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage < (this.pagesAmount - Pagination.DEFAULT_PAGE_COUNT)
      ) {
      for (
          let i = this.activePage - Math.trunc(Pagination.DEFAULT_PAGE_COUNT / 2);
          i < this.activePage + Math.trunc(Pagination.DEFAULT_PAGE_COUNT / 2) + 1;
          i++
      ) {
          items[(items.length - 1) + 1] = {
              type: Pagination.types.page,
              value: i,
              isActive: this.activePage === i,
          };
      }
    }
   
    if (this.pagesAmount > Pagination.DEFAULT_PAGE_COUNT && this.activePage < (this.pagesAmount - Pagination.DEFAULT_PAGE_COUNT)) {
      items[(items.length - 1) + 1] = {
          type: Pagination.types.dotsRight,
          isDisabled: true,
      };
    }

    items[(items.length - 1) + 1] =  {
        type: Pagination.types.arrowRight,
        isDisabled: this.activePage === this.pagesAmount,
    };

    items[(items.length - 1) + 1] =  {
      type: Pagination.types.last,
      isDisabled: this.activePage === this.pagesAmount,
    };
    
    return items;
  }

  protected buildButtonElement = (icon?: null | IconName) => {
    const $buttonElement = document.createElement('button');

    $buttonElement.className = [
      style['pagination_item'],
      style[`pagination_item--${this.variant}`],
      style[`pagination_item--${this.size}`],
      `bgc-${this.color}`,
      `br-${this.color}`,
      `text-${this.textColor}`,
    ].join(' ');

    const $iconPagination = new Icon({
      iconName: icon,
      size: 14,
      color: this.textColor,
    })

    if ($iconPagination.icon) {
    $buttonElement.appendChild($iconPagination.icon);
      
    }
    return $buttonElement;
  }

  public buildPaginationSkeleton = () => {
    new Skeleton().buildSkeletonPagination();
  }

  public removePaginationSkeleton = () =>{
    const $skeletonPagination = document.querySelector(`.${styleSkeleton.pagination_container_skelton}`)
    if ($skeletonPagination) {
      $skeletonPagination.remove()
    }
  }

  protected buildPagination = () => {
    const $paginationContainer = this.$paginationContainer || document.createElement('ul');
    $paginationContainer.innerHTML = '';

    $paginationContainer.className = [
      style['pagination_container'],
      `d-flex`,
      `just-content-center`,
      `align-items-center`,
      `gap-1`,
    ].join(' ');

    this.preBuildingPagination().forEach(item =>{
      const $item = document.createElement('li');

      if (item.type === Pagination.types.first) {
        $item.appendChild(this.buildButtonFirstPage())
      }

      if (item.type === Pagination.types.arrowLeft) {
        $item.appendChild(this.buildButtonPreviousPage())
      }

      if (item.type === Pagination.types.arrowRight) {
          $item.appendChild(this.buildButtonNextPage())
      }

      if (item.type === Pagination.types.last) {
        $item.appendChild(this.buildButtonLastPage())
      }

      if (item.type === Pagination.types.dotsLeft) {
          $item.innerText = '...';
      }

      if (item.type === Pagination.types.dotsRight) {
          $item.innerText = '...';
      }

      if (item.type === Pagination.types.page) {
        const $paginationItem = this.buildButtonElement();

        $paginationItem.setAttribute('id', `page_${item.value}`);

        if (item.value) {
          $paginationItem.addEventListener('click', () => this.handlePageClick(item.value));
        }

        $paginationItem.innerText = String(item.value);

        $item.appendChild($paginationItem);
      }

      const $paginationItem = $item.querySelector(`.${style['pagination_item']}`)
      if (item.type === 'page' && item.isActive) {
        if ($paginationItem) {
          $paginationItem.setAttribute('active', 'active')
          $paginationItem.classList.add(style['pagination_item--active']);
        }
      }

      if (item.type !== 'page' && item.isDisabled) {
        if ($paginationItem) {
          $paginationItem.setAttribute('disabled', 'disabled');
          $paginationItem.classList.add(style['pagination_item--disabled'])
        }
      }

      $paginationContainer.appendChild($item)
    })

    this.$paginationContainer = $paginationContainer;
  }

  protected buildButtonFirstPage = () => {
    const $paginationItemToFirstPage = this.buildButtonElement('first');

    $paginationItemToFirstPage.setAttribute('id', 'pagination_first_page');

    $paginationItemToFirstPage.addEventListener('click', () => this.handlePageClick(1))
    
    return $paginationItemToFirstPage;
  }

  protected buildButtonPreviousPage = () => {
    const $paginationItemToPreviousPage = this.buildButtonElement('arrow-left');

    $paginationItemToPreviousPage.setAttribute('id', 'pagination_previous_page');

    $paginationItemToPreviousPage.addEventListener('click', () => {
    
      if (this.activePage > 1) {
          this.handlePageClick(this.activePage - 1);
      }
    });

    return $paginationItemToPreviousPage;
  }

  protected buildButtonNextPage = () => {
    const $paginationItemToNextPage = this.buildButtonElement('arrow-right');

    $paginationItemToNextPage.setAttribute('id', 'pagination_next_page');

    $paginationItemToNextPage.addEventListener('click', () => {

      if (this.activePage < this.pagesAmount) {
          this.handlePageClick(this.activePage + 1);
      }
  });

    return $paginationItemToNextPage;
  }

  protected buildButtonLastPage = () => {
    const $paginationItemToLastPage = this.buildButtonElement('last');

    $paginationItemToLastPage.setAttribute('id', 'pagination_last_page');

    $paginationItemToLastPage.addEventListener('click', () => this.handlePageClick(this.pagesAmount));

    return $paginationItemToLastPage
  }

}

export default Pagination;