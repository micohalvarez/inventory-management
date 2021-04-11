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
  gettingPayment: false,
  loadingMore: false,
  newSales: [],
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_START:
      return {
        ...state,
        gettingOrders: true,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        gettingOrders: false,
        orders: action.payload.orders,
        ordersCount: action.payload.count,
        ordersOffset: action.payload.offSet,
        ordersPage: action.payload.page,
      };
    case actionTypes.GET_ORDERS_FAIL:
      return {
        ...state,
        gettingOrders: false,
      };

    case actionTypes.ADD_ORDERS_SUCCESS:
      // var newArray = [];
      // newArray.push(action.payload);
      // const curPreviousPlays = [...state.orders];

      // const newPreviousPlays = newArray.concat(curPreviousPlays);

      return {
        ...state,
        gettingOrders: false,
        // orders: newPreviousPlays,
        // ordersCount: state.ordersCount + 1,
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
    case actionTypes.CLEAR_FILTER_ORDER:
      return {
        ...state,
        filter: null,
      };
    default:
      return state;
  }
};

export default data;
