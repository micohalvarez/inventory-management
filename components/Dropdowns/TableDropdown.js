import React, { useEffect, useState } from 'react';
import { createPopper } from '@popperjs/core';
import { useSession } from 'next-auth/client';

const NotificationDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [session, loading] = useSession();
  useEffect(() => {
    if (dropdownPopoverShow) setDropdownPopoverShow(false);
  }, [props.isClicked]);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'left-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-gray-600 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-transparent text-base z-50 float-left list-none text-left rounded min-w-32'
        }
      >
        <button
          onClick={(e) => {
            props.setShowEditModal(true);
            props.setSelectedItem(props.item);
            closeDropdownPopover();
            e.preventDefault();
            e.stopPropagation();
          }}
          class="bg-gray-600 w-full flex justify-center text-white hover:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          <i className="fas fa-edit text-base self-center mr-1" />
          Edit Item
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.deleteItem(session.user.auth_token, props.item.slug);
          }}
          class="bg-red-600 w-full flex justify-center  text-white hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          <i className="fas fa-trash self-center text-base mr-1" />
          Delete Item
        </button>
      </div>
    </>
  );
};

export default NotificationDropdown;
