import * as actionTypes from '../actions/salesActions/actionTypes';
const initialState = {
  sales: [],
  gettingSales: false,
  salesOffset: 0,
  salesPage: 0,
  salesCount: 0,
  salesLimit: 10,
  paymentTypes: [],
  filter: null,
  discounted: null,
  search: null,
  gettingPayment: false,
  loadingMore: false,
  newOrder: [],
};

const data = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.GET_SALES_START:
      return {
        ...state,
        gettingSales: true,
      };
    case actionTypes.GET_SALES_SUCCESS:
      return {
        ...state,
        gettingSales: false,
        sales: action.payload.sales,
        salesCount: action.payload.count,
        salesOffset: action.payload.offSet,
        salesPage: action.payload.page,
      };
    case actionTypes.ADD_SALES_FAIL:
      return {
        ...state,
        gettingSales: false,
      };

    case actionTypes.ADD_SALES_SUCCESS:
      return {
        ...state,
        gettingSales: false,
        newOrder: action.payload,
      };
    case actionTypes.GET_PAYMENT_START:
      return {
        ...state,
        gettingPayment: true,
      };
    case actionTypes.GET_PAYMENT_SUCCESS:
      return {
        ...state,
        gettingPayment: false,
        paymentTypes: action.payload.paymentTypes,
      };
    case actionTypes.GET_PAYMENT_FAIL:
      return {
        ...state,
        gettingPayment: false,
      };
    case actionTypes.ADD_FILTER_SALES:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case actionTypes.CLEAR_FILTER_SALES:
      return {
        ...state,
        filter: null,
      };
    case actionTypes.ADD_SEARCH_SALES:
      return {
        ...state,
        search: action.payload.search,
      };
    case actionTypes.CLEAR_SEARCH_SALES:
      return {
        ...state,
        search: null,
      };
    case actionTypes.ADD_DISCOUNT:
      return {
        ...state,
        discounted: 'False',
      };
    case actionTypes.CLEAR_DISCOUNT:
      return {
        ...state,
        discounted: null,
      };
    default:
      return state;
  }
};

export default data;
