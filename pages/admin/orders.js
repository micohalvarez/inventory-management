import { withRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';

// components

import OrdersTable from '../../components/Cards/OrdersTable';

// layout for page

import Admin from '../../layouts/Admin';
import * as orderActions from '../../redux/actions/orderActions';
import * as localStorage from '../../utils/local-storage';
import * as salesActions from '../../redux/actions/salesActions';
import * as inventoryActions from '../../redux/actions/inventoryActions';
const Orders = (props) => {
  const [authToken, setAuthToken] = useState(false);
  useEffect(() => {
    const authCreds = localStorage.getLocalStorage('authCreds');
    if (!authCreds) {
      Router.push('/');
    } else {
      setAuthToken(authCreds.authToken);
      props.getOrders(authCreds.authToken);
      props.getPaymentTypes(authCreds.authToken);
      props.getItems(authCreds.authToken);
    }
  }, []);
  return (
    <Admin>
      <div className="flex flex-wrap mt-10 ">
        <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
          <OrdersTable orders={props.orders} authToken={authToken} />
        </div>
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  items: state.inventory.items,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: (token) => {
    dispatch(orderActions.getOrders(token));
  },
  getItems: (authToken) => dispatch(inventoryActions.getItems(authToken)),
  getPaymentTypes: (authToken) =>
    dispatch(salesActions.getPaymentTypes(authToken)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
