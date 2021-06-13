import { withRouter, Router } from 'next/router';
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
import { useSession, getSession } from 'next-auth/client';

const Orders = (props) => {
  const [authToken, setAuthToken] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    props.getOrders(session.user.auth_token);
    props.getItems(session.user.auth_token);
    props.getPaymentTypes(session.user.auth_token);
  }, []);

  return (
    <Admin>
      <div className="flex flex-wrap mt-10 ">
        <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
          <OrdersTable
            orders={props.orders}
            authToken={session.user.auth_token}
          />
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

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
