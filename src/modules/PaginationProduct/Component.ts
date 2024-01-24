import Pagination from "@components/Pagination";
import ProductState from "@state/ProductState";

import {
  type ProductStateType
} from "@state/ProductState";


class PaginationProduct extends Pagination { 
  eventTypes = [
    ProductState.EVENT_TYPE_UPDATE_PAGINATION,
    ProductState.EVENT_TYPE_PRODUCT_LOADING,
    ProductState.EVENT_TYPE_UPDATE_INIT,
  ];
  
  displayName = 'PaginationProductDecorator';
  
  handleEvent = (newState: ProductStateType, prevState: ProductStateType, eventType: string) => {
    if (!newState.isInitProduct && newState.isLoadingProduct && !prevState.isLoadingProduct) {
      this.buildPaginationSkeleton();
    }
    
    if (!newState.isLoadingProduct) {
      this.removePaginationSkeleton();
    }

    if (
      eventType === ProductState.EVENT_TYPE_UPDATE_PAGINATION &&
      newState.isInitProduct ||
      eventType === ProductState.EVENT_TYPE_UPDATE_INIT
    ) {
      const activePage = prevState.pagination?.active !== newState.pagination?.active 
        ? newState.pagination?.active 
        : prevState.pagination?.active;
      
      const elementsAmount = prevState.pagination?.elementsAmount !== newState.pagination?.elementsAmount 
        ? newState.pagination?.elementsAmount 
        : prevState.pagination?.elementsAmount;

      this.handleChangeActivePage(activePage, elementsAmount);
  
    }
  }

}

export default PaginationProduct;