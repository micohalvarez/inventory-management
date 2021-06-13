import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';

// components

import SalesTable from '../../components/Cards/SalesTable';

// layout for page

import Admin from '../../layouts/Admin';
import * as localStorage from '../../utils/local-storage';
import * as salesActions from '../../redux/actions/salesActions';
import * as inventoryActions from '../../redux/actions/inventoryActions';
import { useSession, getSession } from 'next-auth/client';

const Sales = (props) => {
  const [session, loading] = useSession();

  useEffect(() => {
    props.getSales(session.user.auth_token);
    props.getItems(session.user.auth_token);
    props.getPaymentTypes(session.user.auth_token);
    props.getAllItems(session.user.auth_token);
  }, []);

  console.log(props);
  return (
    <Admin>
      <div className="flex flex-wrap mt-10 ">
        <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
          <SalesTable sales={props.sales} authToken={session.user.auth_token} />
        </div>
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
