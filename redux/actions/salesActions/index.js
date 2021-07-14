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
          (sales.discounted ? `&discount_approved=${sales.discounted}` : '') +
          (sales.delete ? `&for_delete=${sales.delete}` : ''),
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

export const createSalesOrder = (
  authToken,
  payload,
  totalDiscount,
  customerName
) => {
  return (dispatch) => {
    var data;

    if (totalDiscount > 0)
      data = {
        items: payload,
        total_discount: totalDiscount / 100,
        customer_name: customerName,
      };
    else
      data = {
        items: payload,
        customer_name: customerName,
      };

    console.log(data);
    return authInstance.post(`/sales_order/`, data, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const editSalesOrder = (authToken, payload, totalDiscount) => {
  return (dispatch) => {
    var data;
    console.log(totalDiscount);
    if (totalDiscount > 0)
      data = {
        items: payload,
        total_discount: totalDiscount / 100,
      };
    else
      data = {
        items: payload,
      };

    console.log(data);

    return authInstance.patch(`/sales_order/`, data, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const addPaymentMethod = (authToken, payload) => {
  return (dispatch) => {
    return authInstance.post(`/payment/`, payload, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const approveDiscount = (authToken, uuid, discount) => {
  return (dispatch) => {
    console.log('hoy');
    return authInstance.post(
      `/sales_order/${uuid}/approve_discount/`,
      {
        total_discount: discount,
      },
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  };
};

export const searchSales = (authToken, id) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_SALES_START });

    authInstance
      .get(`/sales_order/?order_number=${id}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data) {
          var array = [];
          dispatch({
            type: actionTypes.GET_SALES_SUCCESS,
            payload: {
              sales: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        } else if (res.response.status === 404) {
          dispatch({
            type: actionTypes.GET_SALES_SUCCESS,
            payload: {
              sales: [],
              count: 0,
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

export const deleteOrder = (authToken, uuid) => {
  return (dispatch) => {
    return authInstance.delete(
      `/sales_order/${uuid}/`,

      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  };
};

export const declineDelete = (authToken, uuid) => {
  return (dispatch) => {
    return authInstance.post(
      `/sales_order/${uuid}/decline_delete/`,
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

export const addDelete = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_DELETE,
    });
  };
};

export const clearDelete = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_DELETE });
  };
};

export const addSearch = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_SEARCH_SALES,
    });
  };
};

export const clearSearch = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_SEARCH_SALES });
  };
};
