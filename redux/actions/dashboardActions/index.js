import * as actionTypes from './actionTypes';

import authInstance from '../../../utils/auth-instance';

const ITEMS_LIMIT = 10;

export const getItems = (authToken) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(`/product/?limit=${ITEMS_LIMIT}&offset=0&low_stock=true`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
              sort: 0,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getNextItems = (authToken, offSet, page) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(`/product/?limit=${ITEMS_LIMIT}&offset=${offSet}&low_stock=true`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: offSet,
              page: page,
              sort: 0,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getDiscountApproveSales = (authToken) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(
        `/sales_order/?limit=${ITEMS_LIMIT}&offset=0&discount_approved=False`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
              sort: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getNextDiscountApproveSales = (authToken, offSet, page) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(
        `/sales_order/?limit=${ITEMS_LIMIT}&offset=${offSet}&discount_approved=false`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: offSet,
              page: page,
              sort: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getPurchaseOrdersDeadline = (authToken) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(`/purchase_order/?limit=${ITEMS_LIMIT}&offset=0&is_deadline=True`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
              sort: 2,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getNextPurchaseOrdersDeadline = (authToken) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(
        `/purchase_order/?limit=${ITEMS_LIMIT}&offset=${offSet}&is_deadline=True`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
              sort: 2,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getSalesOrdersDeadline = (authToken) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(`/sales_order/?limit=${ITEMS_LIMIT}&offset=0&is_deadline=True`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
              sort: 3,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

export const getNextSalesOrdersDeadline = (authToken) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START_DASHBOARD });
    authInstance
      .get(
        `/sales_order/?limit=${ITEMS_LIMIT}&offset=${offSet}&is_deadline=True`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS_DASHBOARD,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
              sort: 3,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL_DASHBOARD });
      });
  };
};

// export const addSort = (sort) => {
//   return (dispatch) => {
//     console.log(sort,'hehe')
//     dispatch({ type: actionTypes.ADD_SORT_DASHBOARD, payload: { sort: sort } });
//   };
// };

// export const clearSort = () => {
//   return (dispatch) => {
//     dispatch({ type: actionTypes.CLEAR_SORT_DASHBOARD });
//   };
// };
