import * as actionTypes from '../actions/dashboardActions/actionTypes';
const initialState = {
  items: [],
  gettingItems: false,
  gettingCategories: false,
  itemsOffset: 0,
  itemsPage: 0,
  sort: 0,
  totalCount: 0,
  itemsLimit: 10,
  loadingMore: false,
};

const data = (state = initialState, action) => {
  console.log(action,'hi')
  switch (action.type) {

    case actionTypes.GET_ITEMS_START_DASHBOARD:
      return {
        ...state,
        gettingItems: true,
      };
    case actionTypes.GET_ITEMS_SUCCESS_DASHBOARD:
      return {
        ...state,
        gettingItems: false,
        items: action.payload.items,
        totalCount: action.payload.count,
        itemsOffset: action.payload.offSet,
        itemsPage: action.payload.page,
        sort:action.payload.sort
      };
    case actionTypes.GET_ITEMS_FAIL_DASHBOARD:
      return {
        ...state,
        gettingItems: false,
      };
    case actionTypes.ADD_SORT_DASHBOARD:
      return {
        ...state,
        sort: action.payload.sort,
      };
    case actionTypes.CLEAR_SORT_DASHBOARD:
      return {
        ...state,
        sort: null,
      };

    default:
      return state;
  }
};

export default data;
