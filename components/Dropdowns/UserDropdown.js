import React, { useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import { signOut } from 'next-auth/client';

const UserDropdown = (props) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  useEffect(() => {
    if (dropdownPopoverShow) setDropdownPopoverShow(false);
  }, [props.isClicked]);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-gray-600 block"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex cursor-pointer">
          <span className="w-12 h-12 text-sm text-white bg-white inline-flex items-center justify-center rounded-full">
            <i class="fas fa-user text-black"></i>
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-transparent text-base z-50 float-left mt-1 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <a
          className="cursor-pointer bg-red-600 w-full flex justify-center  text-white hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={(e) => signOut()}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
