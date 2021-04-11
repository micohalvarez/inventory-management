import * as actionTypes from '../actions/inventoryActions/actionTypes';
const initialState = {
  credits: 0,
  gettingCredits: false,
  items: [],
  categories: [],
  gettingItems: false,
  gettingCategories: false,
  itemsOffset: 0,
  itemsPage: 0,
  sort: null,
  filter: null,
  totalCount: 0,
  itemsLimit: 10,
  loadingMore: false,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS_START:
      return {
        ...state,
        gettingItems: true,
      };
    case actionTypes.GET_ITEMS_SUCCESS:
      return {
        ...state,
        gettingItems: false,
        items: action.payload.items,
        totalCount: action.payload.count,
        itemsOffset: action.payload.offSet,
        itemsPage: action.payload.page,
      };
    case actionTypes.GET_ITEMS_FAIL:
      return {
        ...state,
        gettingItems: false,
      };
    case actionTypes.GET_ITEMS_START:
      return {
        ...state,
        gettingItems: true,
      };
    case actionTypes.GET_ITEMS_SUCCESS:
      return {
        ...state,
        gettingItems: false,
        items: action.payload.items,
        totalCount: action.payload.count,
        itemsOffset: 0,
      };
    case actionTypes.GET_ITEMS_FAIL:
      return {
        ...state,
        gettingItems: false,
      };
    case actionTypes.GET_CATEGORIES_START:
      return {
        ...state,
        gettingCategories: true,
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        gettingCategories: false,
        categories: action.payload.categories,
      };
    case actionTypes.GET_CATEGORIES_FAIL:
      return {
        ...state,
        gettingCategories: false,
      };

    case actionTypes.ADD_FILTER_INVENTORY:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case actionTypes.CLEAR_FILTER_INVENTORY:
      return {
        ...state,
        filter: null,
      };
    case actionTypes.ADD_SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };
    case actionTypes.CLEAR_SORT:
      return {
        ...state,
        sort: null,
      };

    default:
      return state;
  }
};

export default data;
