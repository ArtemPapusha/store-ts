import '@style/pages/products.scss'

import { $divApp } from '@constants/div.app';

import ListProducts from '@modules/ListProducts';
import ProductAPI from '@services/ProductAPI';
import ProductState from '@state/ProductState';
import Pagination from '@modules/PaginationProduct';
import AddProductForm from '@modules/AddProductForm';
import QueryParamService from '@services/QueryParamService';


const queryParams = new QueryParamService()
new AddProductForm();
const listCards = new ListProducts();
const productState = new ProductState();
const productAPI = new ProductAPI(productState);
const pagination = new Pagination({
  active: productState.state.pagination.active ?? 1,
  pagesAmount: productState.state.pagination.pagesAmount
});

productState.addObserver(pagination).addObserver(listCards);

pagination.setPageClick(async (page) => {
  pagination.setDisabled();
  
  if (page) {
    await productAPI.getProducts(page);
  }
  
  queryParams.updatePageUrl(Number(page))
})

async function init() {
  await productAPI.getProducts(productState.state.pagination.active);

  if (pagination.pagination && $divApp) {
    $divApp.appendChild(pagination.pagination);
  }
}

await init();
