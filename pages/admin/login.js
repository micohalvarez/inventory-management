/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/client';

// layout for page

import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import * as authActions from '../../redux/actions/authActions';

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState('');

  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.errors) {
      setLoading(false);
    }
  }, [props.errors]);

  const clearErrors = () => {
    props.clearErrors();
    setEmailError('');
    setPasswordError('');
    setLoading(false);
  };
  const handleEmail = (event) => {
    event.preventDefault();
    clearErrors();
    setEmailAddress(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    clearErrors();
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();

    clearErrors();
    setLoading(true);

    let error = false;

    if (emailAddress === '') {
      setEmailError('Please up field');
      error = true;
    }

    if (password === '') {
      setPasswordError('Please up field');
      error = true;
    }

    if (error) {
      setHasError(true);
      setLoading(false);
    } else {
      const payload = {
        emailAddress: emailAddress,
        password: password,
      };

      props.loginNextAuth(payload);
    }
  };

  return (
    <>
      <div className="container flex flex-col bg-gray-700 min-w-full min-h-screen justify-center">
        <div className="flex  items-center justify-center alh-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6"></div>

              <form
                onSubmit={handleSubmit}
                className="flex-auto px-4 lg:px-10 py-10 pt-0"
              >
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <medium>Sign in with credentials</medium>
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    value={emailAddress}
                    onChange={handleEmail}
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="Username"
                  />
                  {props.errors ? (
                    <span className="text-red-500">{props.errors}</span>
                  ) : emailError ? (
                    <span className="text-red-500">{emailError}</span>
                  ) : null}
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={handlePassword}
                    type="password"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                  />
                  {passwordError ? (
                    <span className="text-red-500">{passwordError}</span>
                  ) : null}
                </div>

                <div className="text-center mt-6">
                  {/* <button type="button">Sign In</button> */}

                  <div className="text-center mt-6">
                    <input
                      className="cursor-pointer bg-gray-900 hover:bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      value="Submit"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(authActions.login(payload)),
  clearErrors: (payload) => dispatch(authActions.clearErrors()),
  loginNextAuth: (payload) => dispatch(authActions.loginNextAuth(payload)),
});

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/admin/inventory',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
