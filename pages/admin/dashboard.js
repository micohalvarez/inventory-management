import React, { useEffect, useState } from 'react';

// components

import DashboardTable from '../../components/Cards/DashboardTable';

// layout for page

import Admin from '../../layouts/Admin';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as dashboardActions from '../../redux/actions/dashboardActions';
import * as inventoryActions from '../../redux/actions/inventoryActions';
import * as salesActions from '../../redux/actions/salesActions';
import { useSession, getSession } from 'next-auth/client';

const Dashboard = (props) => {
  const [authToken, setAuthToken] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    props.getItems(session.user.auth_token);
    props.getInventoryItems(session.user.auth_token);
    props.getPaymentTypes(session.user.auth_token);
  }, []);

  return (
    <Admin>
      <div className="flex flex-wrap mt-10">
        <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
          <DashboardTable
            sales={props.sales}
            items={props.items}
            authToken={authToken}
          />
        </div>
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({
  items: state.dashboard.items,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (authToken) => dispatch(dashboardActions.getItems(authToken)),
  getInventoryItems: (authToken) =>
    dispatch(inventoryActions.getItems(authToken)),
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
