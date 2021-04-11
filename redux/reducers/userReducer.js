import * as actionTypes from '../actions/userActions/actionTypes';
const initialState = {
  users: [],
  gettingUsers: false,
  usersOffset: 0,
  usersPage: 0,
  totalCount: 0,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_START:
      return {
        ...state,
        gettingUsers: true,
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        gettingUsers: false,
        users: action.payload.users,
        totalCount: action.payload.count,
        usersOffset: action.payload.offSet,
        usersPage: action.payload.page,
      };
    case actionTypes.GET_USERS_FAIL:
      return {
        ...state,
        gettingUsers: false,
      };

    default:
      return state;
  }
};

export default data;
