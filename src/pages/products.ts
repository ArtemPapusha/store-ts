import '@style/pages/products.scss'

import { $app } from '@constants/div.app';

import ListProducts from '@modules/ListProducts';
import ProductAPI from '@services/ProductAPI';
import CartAPI from '@services/CartAPI';
import ProductState from '@state/ProductState';
import Pagination from '@modules/PaginationProduct';
import AddProductControler from '@modules/AddProductController';
import AddCartController from '@modules/AddCartController';
import QueryParamService from '@services/QueryParamService';

const queryParams = new QueryParamService()
new AddProductControler();
const cart = new AddCartController();
const listCards = new ListProducts();
const productState = new ProductState();
const productAPI = new ProductAPI();
const cartAPI = new CartAPI()
const pagination = new Pagination({
  active: productState.state.pagination.active ?? 1,
  pagesAmount: productState.state.pagination.pagesAmount
});

productState.addObserver(pagination).addObserver(listCards).addObserver(cart);

pagination.setPageClick(async (page) => {
  pagination.setDisabled();
  if (page) {
    await productAPI.getProducts(page);
  }
  
  queryParams.updateUrl('page=', String(page));

  if (page === 1) {
    queryParams.removeQueryParam(['page=']);
  }
})

async function init() {
  await productAPI.getProducts(productState.state.pagination.active);
  cartAPI.getProductForCart()

  if (pagination.pagination && $app) {
    $app.appendChild(pagination.pagination);
  }
}


await init();
