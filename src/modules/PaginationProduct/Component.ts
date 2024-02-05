import Pagination from "@components/Pagination";
import ProductState from "@state/ProductState";

import { type ProductStateType } from "@state/ProductState";

class PaginationProduct extends Pagination { 
  public eventTypes: string[] = [
    ProductState.EVENT_TYPE_UPDATE_PAGINATION,
    ProductState.EVENT_TYPE_PRODUCT_LOADING,
    ProductState.EVENT_TYPE_UPDATE_INIT,
  ];
  
  public displayName: string = 'PaginationProductDecorator';
  
  public handleEvent = (
    newState: ProductStateType,
    prevState: ProductStateType,
    eventType: string
    ) => {
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

      const pagesAmount = prevState.pagination?.pagesAmount !== newState.pagination?.pagesAmount 
      ? newState.pagination?.pagesAmount 
      : prevState.pagination?.pagesAmount;

      this.handleChangeActivePage(activePage, pagesAmount);
    }
  }
}

export default PaginationProduct;