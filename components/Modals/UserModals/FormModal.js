import { useSession } from 'next-auth/client';
import React, { useState } from 'react';

const FormModal = (props) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [userType, setUserType] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [session, loading] = useSession();
  const [passwordSeen, setPasswordSeen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    removeErrors();
    if (username == '') {
      setUsernameError('Field Required');
      error = true;
    }
    if (password == '') {
      setPasswordError('Field Required');
      error = true;
    }
    if (firstName == '') {
      setFirstNameError('Field Required');
      error = true;
    }
    if (lastName == '') {
      setLastNameError('Field Required');
      error = true;
    }
    if (city == '') {
      setCityError('Field Required');
      error = true;
    }

    if (userType == '') {
      setUserTypeError('Field Required');
      error = true;
    }

    if (!error) {
      const payload = {
        username: username,
        password1: password,
        city: city,
        first_name: firstName,
        last_name: lastName,
        is_staff: true,
        is_admin: true,
        ...(userType === 1 && { groups: [1] }),
      };

      console.log(payload);
      props
        .createUser(session.user.auth_token, payload)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            props.setModalMessage('You have successfully added a new user.');
            props.setModalError(false);
            props.setSuccessModal(true);
            props.getUsers(session.user.auth_token);
          } else {
            for (var key in res.data) {
              var value = res.data[key];
            }
            props.setModalMessage(value[0]);
            props.setModalError(true);
            props.setSuccessModal(true);
          }
        })
        .catch((error) => {
          props.setModalMessage(
            'A server error has occurred. Please try again later'
          );
          props.setModalError(true);
          props.setSuccessModal(true);
        });
      clearState();
    }
  };

  const removeErrors = () => {
    setPasswordError('');

    setUsernameError('');

    setUserTypeError('');
    setPasswordError('');

    setCityError('');
    setFirstNameError('');
    setLastNameError('');
  };
  const clearState = () => {
    setPassword('');
    setPasswordError('');
    setUsername('');
    setUsernameError('');
    setUserType('');
    setUserTypeError('');
    setPasswordError('');
    setPassword('');
    setCity('');
    setCityError('');
    setFirstName('');
    setFirstNameError('');
    setLastName('');
    setLastNameError('');
    props.closeModal();
  };
  return (
    <>
      {props.showModal ? (
        <>
          <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 class="text-3xl font-semibold">Add New User</h3>
                  <button
                    class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => clearState()}
                  >
                    <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div class="p-6 flex-auto mt-10 sm:mt-0">
                  <div class="md:grid md:grid-cols-2 md:gap-6">
                    <div class="md:col-span-1">
                      <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                          New User Information
                        </h3>
                        <p class="mt-1 text-sm text-gray-600">
                          Input the user information required.
                        </p>
                      </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                      <form action="#" method="POST">
                        <div class="shadow overflow-hidden sm:rounded-md bg-">
                          <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="username"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  onChange={(event) =>
                                    setUsername(event.target.value)
                                  }
                                  placeholder="Username"
                                  value={username}
                                  name="username"
                                  id="username"
                                  autocomplete="username"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {usernameError ? (
                                  <span className="text-red-500">
                                    {usernameError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="password"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Password
                                </label>
                                <div className="relative flex w-full flex-wrap items-stretch">
                                  <span
                                    onClick={() =>
                                      setPasswordSeen(!passwordSeen)
                                    }
                                    className="z-10 h-full text-gray-600 hover:text-gray-800 cursor-pointer leading-snug font-normal absolute right-0 pr-2 py-3"
                                  >
                                    {passwordSeen ? (
                                      <i className="fas fa-eye-slash"></i>
                                    ) : (
                                      <i className="fas fa-eye"></i>
                                    )}
                                  </span>
                                  <input
                                    type={`${
                                      passwordSeen ? 'text' : 'password'
                                    }`}
                                    onChange={(event) =>
                                      setPassword(event.target.value)
                                    }
                                    value={password}
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    autocomplete="given-name"
                                    class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                {passwordError ? (
                                  <span className="text-red-500">
                                    {passwordError}
                                  </span>
                                ) : null}
                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="First Name"
                                  name="first_name"
                                  onChange={(event) =>
                                    setFirstName(event.target.value)
                                  }
                                  value={firstName}
                                  id="first_name"
                                  autocomplete="first_name"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {firstNameError ? (
                                  <span className="text-red-500">
                                    {firstNameError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  onChange={(event) =>
                                    setLastName(event.target.value)
                                  }
                                  value={lastName}
                                  name="last_name"
                                  id="last_name"
                                  autocomplete="last_name"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {lastNameError ? (
                                  <span className="text-red-500">
                                    {lastNameError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  onChange={(event) =>
                                    setCity(event.target.value)
                                  }
                                  value={city}
                                  placeholder="City"
                                  name="city"
                                  id="city"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {cityError ? (
                                  <span className="text-red-500">
                                    {cityError}
                                  </span>
                                ) : null}
                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_type"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  User Role
                                </label>
                                <select
                                  onChange={(event) => {
                                    console.log(event.target.value);
                                    setUserType(event.target.value);
                                  }}
                                  class="mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  <option
                                    class="text-color-gray-300"
                                    value=""
                                    disabled
                                    hidden
                                    selected
                                  >
                                    User Role
                                  </option>
                                  <option value={0}>Staff</option>
                                  <option value={1}>Admin</option>
                                </select>
                                {userTypeError ? (
                                  <span className="text-red-500">
                                    {userTypeError}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div class="px-4 py-3 text-right sm:px-6">
                            <button
                              className="bg-red-600 text-white hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => clearState()}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-gray-600 text-white hover:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(event) => handleSubmit(event)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default FormModal;
