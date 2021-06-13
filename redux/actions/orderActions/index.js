import * as actionTypes from './actionTypes';

import Router from 'next/router';
import authInstance from '../../../utils/auth-instance';
import * as localStorage from '../../../utils/local-storage';

const ORDERS_LIMIT = 10;
export const getOrders = (authToken) => {
  return (dispatch, getState) => {
    const orders = getState().orders;

    dispatch({ type: actionTypes.GET_ORDERS_START });
    console.log(authToken, 'hi');
    authInstance
      .get(
        `/purchase_order/?limit=${ORDERS_LIMIT}&offset=0` +
          (orders.filter ? `&status=${orders.filter}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_ORDERS_SUCCESS,
            payload: {
              orders: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        } else dispatch({ type: actionTypes.GET_ORDERS_FAIL });
      })
      .catch((error) => dispatch({ type: actionTypes.GET_ORDERS_FAIL }));
  };
};

export const getNextItems = (authToken, offSet, page) => {
  return (dispatch, getState) => {
    const orders = getState().orders;
    dispatch({ type: actionTypes.GET_ORDERS_START });

    authInstance
      .get(
        `/purchase_order/?limit=${ORDERS_LIMIT}&offset=${offSet}` +
          (orders.filter ? `&status=${orders.filter}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_ORDERS_SUCCESS,
            payload: {
              orders: res.data.results,
              count: res.data.count,
              offSet: offSet,
              page: page,
            },
          });
        } else dispatch({ type: actionTypes.GET_ORDERS_FAIL });
      })
      .catch((error) => dispatch({ type: actionTypes.GET_ORDERS_FAIL }));
  };
};

export const getOrdersWithFilter = (authToken, filter) => {
  return (dispatch, getState) => {
    const orders = getState().orders;
    dispatch({ type: actionTypes.GET_ORDERS_START });

    authInstance
      .get(`/purchase_order/?status=${orders.filter}&ordering=id`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ORDERS_SUCCESS,
            payload: {
              orders: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ORDERS_SUCCESS });
      });
  };
};

export const createPurchaseOrder = (authToken, payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_ORDERS_START });

    const data = {
      items: payload,
    };

    return authInstance.post(`/purchase_order/`, data, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const addFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_FILTER_ORDER,
      payload: { filter: filter },
    });
  };
};

export const clearFilter = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_FILTER_ORDER });
  };
};

export const markPaid = (authToken, uuid) => {
  return (dispatch) => {
    console.log('HOy');
    return authInstance.post(
      `/purchase_order/${uuid}/mark_as_paid/`,
      {},
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  };
};

export const cancelOrder = (authToken, uuid) => {
  return (dispatch) => {
    return authInstance.post(
      `/purchase_order/${uuid}/cancel/`,
      {},
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  };
};
