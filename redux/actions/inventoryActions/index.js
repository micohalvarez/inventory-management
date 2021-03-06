import * as actionTypes from './actionTypes';

import Router from 'next/router';
import authInstance from '../../../utils/auth-instance';

const ITEMS_LIMIT = 10;

export const getItems = (authToken, slug = null) => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;
    dispatch({ type: actionTypes.GET_ITEMS_START });
    authInstance
      .get(
        `/product/?limit=${ITEMS_LIMIT}&offset=0` +
          (inventory.filter ? `&category=${inventory.filter}` : '') +
          (inventory.sort ? `&ordering=${inventory.sort}` : '&ordering=-created'),

        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL });
      });
  };
};

export const searchItem = (authToken, slug) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.GET_ITEMS_START });
    authInstance
      .get(`/product/?search=${slug}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {

        if (res.status === 200 && res.data) {
          var array = [];
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        } else if (res.response.status === 404) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS,
            payload: {
              items: [],
              count: 0,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL });
      });
  };
};

export const getNextItems = (authToken, offSet, page) => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;

    dispatch({ type: actionTypes.GET_ITEMS_START });

    authInstance
      .get(
        `/product/?limit=${ITEMS_LIMIT}&offset=${offSet}` +
          (inventory.filter ? `&category=${inventory.filter}` : '') +
          (inventory.sort ? `&ordering=${inventory.sort}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {

        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: offSet,
              page: page,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL });
      });
  };
};

export const getItemsWithFilter = (authToken) => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;
    dispatch({ type: actionTypes.GET_ITEMS_START });

    authInstance
      .get(
        `/product/?category=${inventory.filter}` +
          (inventory.sort !== null ? `&ordering=${inventory.sort}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {

        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL });
      });
  };
};
export const getItemsWithOrdering = (authToken) => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;

    dispatch({ type: actionTypes.GET_ITEMS_START });

    authInstance
      .get(
        `/product/?ordering=${inventory.sort}` +
          (inventory.filter ? `&category=${inventory.filter}` : ''),
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => {

        if (res.status === 200 && res.data.results) {

          dispatch({
            type: actionTypes.GET_ITEMS_SUCCESS,
            payload: {
              items: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ITEMS_FAIL });
      });
  };
};

export const getCategories = (authToken, filter) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CATEGORIES_START });
    authInstance
      .get(`/product/category/?ordering=id`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {

          dispatch({
            type: actionTypes.GET_CATEGORIES_SUCCESS,
            payload: {
              categories: res.data.results,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_CATEGORIES_FAIL });
      });
  };
};

export const addItem = (authToken, payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_ITEM_START });


    return authInstance.post(`/product/`, payload, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const editItem = (authToken, payload, slug) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_ITEM_START });


    return authInstance.patch(`/product/${slug}/`, payload, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const deleteItem = (authToken, slug) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_ITEM_START });

    return authInstance.delete(`/product/${slug}/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
  };
};

export const getAllItems = (authToken) => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;
    dispatch({ type: actionTypes.GET_ALL_ITEMS_START });
    authInstance
      .get(`/product/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_ALL_ITEMS_SUCCESS,
            payload: {
              all_items: res.data.results,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_ALL_ITEMS_FAIL });
      });
  };
};

export const getOrdersPerItem = (authToken, slug, date = null) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDERS_PER_ITEM_START });

    return authInstance.get(
      `/product/${slug}/orders/` + (date ? `?order_date=${date}` : ''),
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  };
};

export const addSort = (sort) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_SORT, payload: { sort: sort } });
  };
};

export const clearSort = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_SORT });
  };
};

export const addFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_FILTER_INVENTORY,
      payload: { filter: filter },
    });
  };
};

export const clearFilter = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_FILTER_INVENTORY });
  };
};
