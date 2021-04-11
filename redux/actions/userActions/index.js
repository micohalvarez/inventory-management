import * as actionTypes from './actionTypes';

import authInstance from '../../../utils/auth-instance';

const USERS_LIMIT = 10;

export const getUsers = (authToken) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USERS_START });

    authInstance
      .get(`/account/?limit=${USERS_LIMIT}&offset=0`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_USERS_SUCCESS,
            payload: {
              users: res.data.results,
              count: res.data.count,
              offSet: 0,
              page: 1,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_USERS_FAIL });
      });
  };
};

export const getNextItems = (authToken, offSet, page) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USERS_START });

    authInstance
      .get(`/account/?limit=${SALES_LIMIT}&offset=${offSet}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          dispatch({
            type: actionTypes.GET_USERS_SUCCESS,
            payload: {
              users: res.data.results,
              count: res.data.count,
              offSet: offSet,
              page: page,
            },
          });
        }
      })
      .catch(({ response }) => {
        dispatch({ type: actionTypes.GET_USERS_FAIL });
      });
  };
};
