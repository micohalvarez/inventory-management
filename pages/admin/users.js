import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components

import UsersTable from '../../components/Cards/UsersTable';

// layout for page

import Admin from '../../layouts/Admin';
import * as localStorage from '../../utils/local-storage';
import * as userActions from '../../redux/actions/userActions';
const Users = (props) => {
  const [authToken, setAuthToken] = useState(false);
  useEffect(() => {
    const authCreds = localStorage.getLocalStorage('authCreds');

    if (!authCreds) {
      Router.push('/');
    } else {
      setAuthToken(authCreds.authToken);
      props.getUsers(authCreds.authToken);
    }
  }, []);
  console.log(props);
  return (
    <Admin>
      <div className="flex flex-wrap mt-10 ">
        <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
          <UsersTable users={props.users} />
        </div>
      </div>
    </Admin>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (authToken) => dispatch(userActions.getUsers(authToken)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
