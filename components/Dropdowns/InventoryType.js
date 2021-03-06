import React, { useEffect, useState } from 'react';
import { createPopper } from '@popperjs/core';

import * as localStorage from '../../utils/local-storage';
import { useSession } from 'next-auth/client';

const NotificationDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const [filter, setFilter] = useState(false);

  const [session, loading] = useSession();
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

  const onSelectFilter = (type) => {
    setFilter(type);

    props.addFilter(type);

    props.getItemsWithFilter(session.user.auth_token);
    closeDropdownPopover();
  };
  const clearFilter = () => {
    setFilter(null);
    props.clearFilter();
    props.getItems(session.user.auth_token);
  };
  return (
    <>
      <a
        className={
          'ml-1  border-2  bg-white hover:text-white text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal p-5 ' +
          (filter
            ? 'border-gray-600 hover:bg-red-800 '
            : 'border-gray-600 hover:bg-gray-800')
        }
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.stopPropagation();
          !filter
            ? (e.preventDefault(),
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover())
            : clearFilter();
        }}
      >
        {filter ? props.categories[filter - 1].name : 'Filter By Type'}
        {filter ? null : <i class="fas ml-2 self-center fa-arrow-down"></i>}
      </a>

      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <a
          className={
            'hover:bg-gray-800 hover:text-white text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800'
          }
          onClick={(e) => {
            e.preventDefault();
            onSelectFilter(1);
          }}
        >
          {props.categories.length > 0 ? props.categories[0].name : 'N/A'}
        </a>
        <a
          className={
            'hover:bg-gray-800 hover:text-white text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800'
          }
          onClick={(e) => {
            e.preventDefault();
            onSelectFilter(2);
          }}
        >
          {props.categories.length > 0 ? props.categories[1].name : 'N/A'}
        </a>
        <a
          className={
            'hover:bg-gray-800 hover:text-white text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800'
          }
          onClick={(e) => {
            e.preventDefault();
            onSelectFilter(3);
          }}
        >
          {props.categories.length > 0 ? props.categories[2].name : 'N/A'}
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
