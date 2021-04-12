import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UserDropdown from '../Dropdowns/UserDropdown';

const Navbar = (props) => {
  const router = useRouter();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex p-4">
        <div className="w-full mx-auto items-center flex self-end justify-between md:flex-no-wrap flex-wrap md:px-10 ">
          {/* Brand */}
          <a
            className="text-white text-2xl uppercase hidden lg:inline-block font-bold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {router.pathname.indexOf('/admin/dashboard') !== -1
              ? 'DashBoard'
              : router.pathname.indexOf('/admin/inventory') !== -1
              ? 'Inventory'
              : router.pathname.indexOf('/admin/sales') !== -1
              ? 'Sales Orders'
              : router.pathname.indexOf('/admin/orders') !== -1
              ? 'Purchase Orders'
              : router.pathname.indexOf('/admin/users') !== -1
              ? 'Users'
              : 'Dashboard'}
          </a>
          {/* Form */}
          {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              />
            </div>
          </form> */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Navbar;
