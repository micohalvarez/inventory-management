import * as actionTypes from '../actions/orderActions/actionTypes';
const initialState = {
  orders: [],
  gettingOrderws: false,
  ordersOffset: 0,
  ordersPage: 0,
  ordersCount: 0,
  ordersLimit: 10,
  paymentTypes: [],
  filter: null,
  delete: null,
  gettingPayment: false,
  loading: false,
  newSales: [],
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_START:
      return {
        ...state,
        gettingOrders: true,
        loading: true
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        gettingOrders: false,
        orders: action.payload.orders,
        ordersCount: action.payload.count,
        ordersOffset: action.payload.offSet,
        ordersPage: action.payload.page,
        loading: false
      };
    case actionTypes.GET_ORDERS_FAIL:
      return {
        ...state,
        gettingOrders: false,
        loading: false
      };

    case actionTypes.ADD_ORDERS_SUCCESS:
      return {
        ...state,
        gettingOrders: false,
      };
    case actionTypes.ADD_ORDERS_FAIL:
      return {
        ...state,
        gettingOrders: false,
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

    case actionTypes.ADD_FILTER_ORDER:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case actionTypes.ADD_DELETE_ORDER:
      return {
        ...state,
        delete: 'True',
      };
    case actionTypes.CLEAR_DELETE_ORDER:
      return {
        ...state,
        delete: null,
      };
    case actionTypes.CLEAR_FILTER_ORDER:
      return {
        ...state,
        filter: null,
      };

    case actionTypes.ADD_SEARCH_ORDER:
      return {
        ...state,
        search: action.payload.search,
      };
    case actionTypes.CLEAR_SEARCH_ORDER:
      return {
        ...state,
        search: null,
      };
    default:
      return state;
  }
};

export default data;
