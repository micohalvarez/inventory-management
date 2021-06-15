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
import AdminNavbar from '../../components/Navbars/AdminNavbar';
const Dashboard = (props) => {
  const [session, loading] = useSession();
  const [isClicked, setClicked] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  useEffect(() => {
    props.getItems(session.user.auth_token);
    props.getInventoryItems(session.user.auth_token);
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
      />
      <div
        onClick={(e) => {
          setClicked(!isClicked);
        }}
        className=" flex flex-col flex-1 px-4 mt-24  "
      >
        <DashboardTable isClicked={!isClicked} />
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({});

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
