import authReducer from './authReducer';
import inventoryReducer from './inventoryReducer';
import salesReducer from './salesReducer';
import ordersReducer from './ordersReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
  sales: salesReducer,
  users: userReducer,
  orders: ordersReducer,
});

export default rootReducer;
