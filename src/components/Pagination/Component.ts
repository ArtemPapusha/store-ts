import Icon from '@elements/Icon';
import Skeleton from '@elements/Skeleton';

import style from './style.module.scss'
import styleSkeleton from "../../elements/Skeleton/style.module.scss"
import flex from "@style/utils/flex.module.scss"
import space from "@style/utils/space.module.scss"
import colors from "@style/utils/colors.module.scss"

import { type Color, type IconName} from "@type/app"

import {
  type PaginationInterface,
  type PaginationConstructor,
} from "./type"

class Pagination implements PaginationInterface{
  protected static DEFAULT_PAGE_COUNT = 5;
  protected static PAGE_LIMIT_ELEMENTS = 10;

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
  protected elementsAmount: number;
  protected activePage: number;
  protected variant: string = 'text';
  protected color: Color = 'black';
  protected textColor: Color = 'black';
  protected size: string = '';
  protected handlePageClick: (page: number | null) => void;

  constructor({
    elementsAmount,
    active,
    variant = 'text',
    color = 'black',
    textColor = '',
    size = ''
  }: PaginationConstructor) {
    this.elementsAmount = elementsAmount;
    this.activePage = active;
    this.variant = variant;
    this.color = color;
    this.textColor = textColor;
    this.size = size;

    this.buildPagination();
  }

  public get pagination() {
    return this.$paginationContainer;
  }
  
  set currentActivePage(page: number) {
    this.activePage = page;
  }

  set elementsAmountPage(elementsAmount: number){
    this.elementsAmount = elementsAmount;
  }

  public setPageClick = (handlePageClicker: (page: number | null) => void) => {
    this.handlePageClick = handlePageClicker;
  }

  protected getPagesElementsAmount = () => {
    return Math.round(this.elementsAmount / Pagination.PAGE_LIMIT_ELEMENTS)
  }

  public handleChangeActivePage = (page: number, elementsAmount: number) => {
    this.activePage = page;
    this.elementsAmountPage = elementsAmount

    this.buildPagination();
  }

  protected setDisabled = () => {
    if (this.$paginationContainer) {
      const $paginationItems = this.$paginationContainer.querySelectorAll(`.${style['pagination_item']}`);

      if ($paginationItems.length > 0) {
        $paginationItems.forEach(($paginationItem) => {
          $paginationItem.setAttribute('disabled', 'disabled');
          $paginationItem.classList.add(style['pagination_item--disabled'])
        });
      }
    }
  
  };

  protected handlePageClicker = (page: number | null) => {
    if (page !== undefined && this.handlePageClick) {
      this.handlePageClick(page);
    }

    this.setDisabled();
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

    if (this.getPagesElementsAmount() > Pagination.DEFAULT_PAGE_COUNT && this.activePage > Pagination.DEFAULT_PAGE_COUNT) {
      items[(items.length - 1) + 1] =  {
          type: Pagination.types.dotsLeft,
          isDisabled: true,
      };
    }

    if (this.getPagesElementsAmount() <= Pagination.DEFAULT_PAGE_COUNT) {
      for (let i = 1; i < this.getPagesElementsAmount() + 1; i++) {
          items[(items.length - 1) + 1] =  {
              type: Pagination.types.page,
              value: i,
              isActive: this.activePage === i,
          };
      }
    }

    if (this.getPagesElementsAmount() > Pagination.DEFAULT_PAGE_COUNT && this.activePage <= Pagination.DEFAULT_PAGE_COUNT) {
      for (let i = 1; i < Pagination.DEFAULT_PAGE_COUNT + 1; i++) {
          items[(items.length - 1) + 1] =  {
              type: Pagination.types.page,
              value: i,
              isActive: this.activePage === i,
          };
      }
    }

    if (
      this.getPagesElementsAmount() > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage >= (this.getPagesElementsAmount() - Pagination.DEFAULT_PAGE_COUNT)
      ) {
      for (
          let i = this.getPagesElementsAmount() - Pagination.DEFAULT_PAGE_COUNT;
          i < this.getPagesElementsAmount() + 1;
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
      this.getPagesElementsAmount() > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage > Pagination.DEFAULT_PAGE_COUNT
      && this.activePage < (this.getPagesElementsAmount() - Pagination.DEFAULT_PAGE_COUNT)
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
   
    if (this.getPagesElementsAmount() > Pagination.DEFAULT_PAGE_COUNT && this.activePage < (this.getPagesElementsAmount() - Pagination.DEFAULT_PAGE_COUNT)) {
      items[(items.length - 1) + 1] = {
          type: Pagination.types.dotsRight,
          isDisabled: true,
      };
    }

    items[(items.length - 1) + 1] =  {
        type: Pagination.types.arrowRight,
        isDisabled: this.activePage === this.getPagesElementsAmount(),
    };

    items[(items.length - 1) + 1] =  {
      type: Pagination.types.last,
      isDisabled: this.activePage === this.getPagesElementsAmount(),
    };
    
    return items;
  }

  protected buildButtonElement = (icon?: null | IconName) => {
    const $buttonElement = document.createElement('button');

    $buttonElement.className = [
      style['pagination_item'],
      style[`pagination_item--${this.variant}`],
      style[`pagination_item--${this.size}`],
      colors[`bgc-${this.color}`],
      colors[`br-${this.color}`],
      colors[`text-${this.textColor}`],
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
      flex[`d-flex`],
      flex[`just-content-center`],
      flex[`align-items-center`],
      space[`gap-1`],
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

      if (this.activePage < this.getPagesElementsAmount()) {
          this.handlePageClick(this.activePage + 1);
      }
  });

    return $paginationItemToNextPage;
  }

  protected buildButtonLastPage = () => {
    const $paginationItemToLastPage = this.buildButtonElement('last');

    $paginationItemToLastPage.setAttribute('id', 'pagination_last_page');

    $paginationItemToLastPage.addEventListener('click', () => this.handlePageClick(this.getPagesElementsAmount()));

    return $paginationItemToLastPage
  }

}

export default Pagination;