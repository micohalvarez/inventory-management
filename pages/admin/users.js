import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components

import UsersTable from '../../components/Cards/UsersTable';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
// layout for page

import Admin from '../../layouts/Admin';
import * as localStorage from '../../utils/local-storage';
import * as userActions from '../../redux/actions/userActions';
import { getSession, useSession } from 'next-auth/client';

const Users = (props) => {
  const [isClicked, setClicked] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [session, loading] = useSession();

  useEffect(() => {
    props.getUsers(session.user.auth_token);
  }, []);

  return (
    <Admin showSideBar={showSideBar}>
      <AdminNavbar
        isClicked={!isClicked}
        user={session.user}
        getItems={props.getItems}
        setShowSideBar={setShowSideBar}
        showSideBar={showSideBar}
        searchItem={props.searchUsers}
        resetData={props.getUsers}
      />
      <div
        onClick={(e) => {
          setClicked(!isClicked);
        }}
        className=" flex flex-col flex-1 px-4 mt-24  "
      >
        <UsersTable isClicked={!isClicked} />
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (authToken) => dispatch(userActions.getUsers(authToken)),
  searchUsers: (authToken, id) =>
    dispatch(userActions.searchUsers(authToken, id)),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
