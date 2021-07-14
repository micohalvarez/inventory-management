import React, { useEffect, useState } from 'react';
import { createPopper } from '@popperjs/core';

import * as localStorage from '../../utils/local-storage';
import { useSession } from 'next-auth/client';

const inventoryFilter = (props) => {
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

  const onSelectFilter = (sort) => {
    setFilter(sort);

    if (sort === 'Price') sort = 'unit_price';
    if (sort === 'Date Created') sort = 'created';
    if (sort === 'Type/Brand') sort = 'category';

    props.addSort(sort.toLowerCase());

    props.getItemsWithOrdering(session.user.auth_token);
    closeDropdownPopover();
  };

  const clearFilter = () => {
    setFilter(null);
    props.clearSort();
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
        {filter ? filter.toUpperCase() : 'Sort By'}
        {filter ? null : <i class="fas ml-2 self-center fa-arrow-down"></i>}
      </a>

      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        {props.sort.map((sort, index) => (
          <a
            className={
              'hover:bg-gray-800 hover:text-white text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800'
            }
            onClick={(e) => {
              e.preventDefault();
              onSelectFilter(sort);
            }}
          >
            {sort}
          </a>
        ))}
      </div>
    </>
  );
};

export default inventoryFilter;
