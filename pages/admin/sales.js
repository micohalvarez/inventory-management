import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

// components

import SalesTable from '../../components/Cards/SalesTable';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
// layout for page

import Admin from '../../layouts/Admin';
import * as localStorage from '../../utils/local-storage';
import * as salesActions from '../../redux/actions/salesActions';
import * as inventoryActions from '../../redux/actions/inventoryActions';
import { useSession, getSession } from 'next-auth/client';

const Sales = (props) => {
  const [session, loading] = useSession();
  const [isClicked, setClicked] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    props.getSales(session.user.auth_token);
    props.getItems(session.user.auth_token);
    props.getPaymentTypes(session.user.auth_token);
    props.getAllItems(session.user.auth_token);
  }, []);

  console.log(props);
  return (
    <Admin showSideBar={showSideBar}>
      <AdminNavbar
        isClicked={!isClicked}
        user={session.user}
        getItems={props.getItems}
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
      />
      <div
        onClick={(e) => {
          setClicked(!isClicked);
        }}
        className=" flex flex-col flex-1 px-4 mt-24  "
      >
        <SalesTable sales={props.sales} authToken={session.user.auth_token} />
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({
  sales: state.sales.sales,
  items: state.inventory.items,
  allItems: state.inventory.allItems,
});

const mapDispatchToProps = (dispatch) => ({
  getSales: (authToken) => dispatch(salesActions.getSales(authToken)),
  getSalesWithFilter: (authToken) =>
    dispatch(salesActions.getSalesWithFilter(authToken, filter)),
  getItems: (authToken) => dispatch(inventoryActions.getItems(authToken)),
  getAllItems: (authToken) => dispatch(inventoryActions.getAllItems(authToken)),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sales));
