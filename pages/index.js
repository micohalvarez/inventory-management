import React, { Component } from 'react';

import Login from './admin/login';

import { connect } from 'react-redux';

import { withRouter } from 'next/router';

const App = (props) => {
  return <Login />;
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
