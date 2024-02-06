import '@style/pages/products.scss'

import { $app } from '@constants/div.app';

import ListProducts from '@modules/ListProducts';
import ProductAPI from '@services/ProductAPI';
import ProductState from '@state/ProductState';
import Pagination from '@modules/PaginationProduct';
import AddProductForm from '@modules/AddProduct';
import QueryParamService from '@services/QueryParamService';


const queryParams = QueryParamService.getInstance()
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

  queryParams.updateUrl('page=', String(page))
})

async function init() {
  await productAPI.getProducts(productState.state.pagination.active);

  if (pagination.pagination && $app) {
    $app.appendChild(pagination.pagination);
  }
}

await init();
