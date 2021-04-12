import * as actionTypes from './actionTypes';

import authInstance from '../../../utils/auth-instance';

const SALES_LIMIT = 10;

export const getSales = (authToken) => {
  return (dispatch, getState) => {
    const sales = getState().sales;
    dispatch({ type: actionTypes.GET_SALES_START });
    console.log(sales);
    authInstance
      .get(
        `/sales_order/?limit=${SALES_LIMIT}&offset=0` +
          (sales.filter ? `&status=${sales.filter}` : '') +
          (sales.discounted ? `&discount_approved=${sales.discounted}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_SALES_SUCCESS,
            payload: {
              sales: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_SALES_FAIL });
      });
  };
};

export const getNextItems = (authToken, offSet, page) => {
  return (dispatch, getState) => {
    const sales = getState().sales;
    dispatch({ type: actionTypes.GET_SALES_START });

    authInstance
      .get(
        `/sales_order/?limit=${SALES_LIMIT}&offset=${offSet}` +
          (sales.filter ? `&status=${sales.filter}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_SALES_SUCCESS,
            payload: {
              sales: res.data.results,
              count: res.data.count,
              offSet: offSet,
              page: page,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_SALES_FAIL });
      });
  };
};

export const getSalesWithFilter = (authToken, filter) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_SALES_START });

    authInstance
      .get(`/sales_order/?status=${filter}&ordering=id`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.results) {
          console.log(res);
          dispatch({
            type: actionTypes.GET_SALES_SUCCESS,
            payload: {
              sales: res.data.results,
              count: res.data.count,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_SALES_FAIL });
      });
  };
};

export const getPaymentTypes = (authToken, filter) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PAYMENT_START });
    console.log(filter);
    authInstance
      .get(`/payment/types/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_PAYMENT_SUCCESS,
            payload: {
              paymentTypes: res.data.results,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_PAYMENT_FAIL });
      });
  };
};

export const createSalesOrder = (authToken, payload, setContinue,totalDiscount) => {
  return (dispatch) => {
    var data
    if (totalDiscount > 0)
      data = {
        items: payload,
        total_discount: totalDiscount / 100
      };
    else
      data = {
        items: payload,
      };
      console.log(data)
    return authInstance.post(`/sales_order/`, data, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const addPaymentMethod = (authToken, payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_SALES_START });

    authInstance
      .post(`/payment/`, payload, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('Sales order has bene marked as paid');
          dispatch({ type: actionTypes.ADD_SALES_SUCCESS, payload: res.data });
        } else alert('Item has not enough stock');
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.ADD_SALES_FAIL });
      });
  };
};

export const approveDiscount = (authToken, uuid, discount) => {
  return (dispatch) => {
   
    authInstance.post(
      `/sales_order/${uuid}/approve_discount/`,
      {
        total_discount: discount
      },
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        alert('Sales order has been marked as paid');
      } else alert('Sales order cannot be marked as paid');
    })
    .catch(({ response }) => {
      alert('An error has occurred');
    });
  };
};

export const markPaid = (authToken, uuid) => {
  return (dispatch) => {

    return authInstance.post(
      `/sales_order/${uuid}/mark_as_paid/`,
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
      `/sales_order/${uuid}/cancel/`,
      {},
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  };
};

export const addFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_FILTER_SALES,
      payload: { filter: filter },
    });
  };
};

export const clearFilter = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_FILTER_SALES });
  };
};

export const addDiscount = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_DISCOUNT,
    });
  };
};

export const clearDiscount = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_DISCOUNT });
  };
};
