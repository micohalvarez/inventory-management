import * as authActionTypes from './actionTypes';
import Router from 'next/router';
import authInstance from '../../../utils/auth-instance';
import * as localStorage from '../../../utils/local-storage';
import { signIn } from 'next-auth/client';

export const updateAuthState = (payload) => {
  return {
    type: authActionTypes.UPDATE_AUTH_STATE,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: authActionTypes.UPDATE_USER,
    payload,
  };
};

export const login = (payload) => {
  return (dispatch) => {
    dispatch({ type: authActionTypes.LOGIN_START });

    const data = {
      username: payload.emailAddress,
      password: payload.password,
    };

    authInstance
      .post('/account/login/', data)
      .then((res) => {
        if (res.status === 200) {
          const authPayload = {
            signedIn: true,
            authToken: res.data.auth_token,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            birthday: res.data.birthday,
          };
          localStorage.saveLocalStorage('authCreds', authPayload);
          dispatch({ type: authActionTypes.LOGIN_SUCCESS });
          Router.push('/admin/inventory');
        }
      })
      .catch((error) => {});
  };
};

export const loginNextAuth = (payload) => {
  return (dispatch) => {
    dispatch({ type: authActionTypes.LOGIN_START });

    signIn('credentials', {
      redirect: false,
      emailAddress: payload.emailAddress,
      password: payload.password,
    })
      .then((res) => {

        if (!res.error) {
          dispatch({ type: authActionTypes.LOGIN_SUCCESS });
          Router.replace('/admin/inventory');
        } else {
          dispatch({ type: authActionTypes.LOGIN_FAIL, error: res.error });
        }
      })
      .catch(() => {
        dispatch({ type: authActionTypes.LOGIN_FAIL });
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const authState = getState().auth;

    dispatch({ type: authActionTypes.LOGOUT });
  };
};

export const clearErrors = () => {
  return (dispatch) => {
    dispatch({ type: authActionTypes.CLEAR_ERRORS });
  };
};

export const getUsers = (authToken) => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;
    dispatch({ type: actionTypes.GET_ITEMS_START });
    authInstance
      .get(
        `/accoun/?limit=${10}&offset=0` +
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
