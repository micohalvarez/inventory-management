import { withRouter, Router } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';

// components

import OrdersTable from '../../components/Cards/OrdersTable';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
// layout for page

import Admin from '../../layouts/Admin';
import * as orderActions from '../../redux/actions/orderActions';
import * as salesActions from '../../redux/actions/salesActions';
import * as inventoryActions from '../../redux/actions/inventoryActions';
import { useSession, getSession } from 'next-auth/client';

const Orders = (props) => {
  const [authToken, setAuthToken] = useState(false);
  const [session, loading] = useSession();
  const [isClicked, setClicked] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    props.getOrders(session.user.auth_token);
    props.getItems(session.user.auth_token);
    props.getPaymentTypes(session.user.auth_token);
  }, []);

  return (
    <Admin showSideBar={showSideBar}>
      <AdminNavbar
        isClicked={!isClicked}
        user={session.user}
        getItems={props.getItems}
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
        searchItem={props.searchOrders}
        resetData={props.getOrders}
      />
      <div
        onClick={(e) => {
          setClicked(!isClicked);
        }}
        className=" flex flex-col flex-1 px-4 mt-24  "
      >
        <OrdersTable isClicked={!isClicked} />
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

  searchOrders: (authToken, id) =>
    dispatch(orderActions.searchOrders(authToken, id)),
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
