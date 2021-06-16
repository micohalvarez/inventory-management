import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/client';

// components

import InventoryTable from '../../components/Cards/InventoryTable';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
// layout for page

import Admin from '../../layouts/Admin';
import * as localStorage from '../../utils/local-storage';
import * as inventoryActions from '../../redux/actions/inventoryActions';

const Inventory = (props) => {
  const [authToken, setAuthToken] = useState(false);
  const [session, loading] = useSession();
  const [isClicked, setClicked] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    props.getItems(session.user.auth_token);
    props.getCategories(session.user.auth_token);
    props.getAllItems(session.user.auth_token);
  }, []);

  const signOutClick = () => {
    signOut();
  };

  return (
    <Admin showSideBar={showSideBar}>
      <AdminNavbar
        isClicked={!isClicked}
        user={session.user}
        getItems={props.getItems}
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
        searchItem={props.searchItem}
        resetData={props.getItems}
      />
      <div
        onClick={(e) => {
          setClicked(!isClicked);
        }}
        className=" flex flex-col flex-1 px-4 mt-24  "
      >
        <InventoryTable
          isClicked={!isClicked}
          items={props.items}
          authToken={authToken}
        />
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({
  items: state.inventory.items,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (authToken) => dispatch(inventoryActions.getItems(authToken)),
  getCategories: (authToken) =>
    dispatch(inventoryActions.getCategories(authToken)),
  getAllItems: (authToken) => dispatch(inventoryActions.getAllItems(authToken)),
  searchItem: (authToken, slug) =>
    dispatch(inventoryActions.searchItem(authToken, slug)),
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
  connect(mapStateToProps, mapDispatchToProps)(Inventory)
);
