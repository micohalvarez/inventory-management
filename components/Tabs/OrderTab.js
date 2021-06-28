import { useSession } from 'next-auth/client';
import React, { useState } from 'react';

import * as localStorage from '../../utils/local-storage';

const OrderTab = (props) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [filter, setFilter] = useState(false);
  const [session, loading] = useSession();

  const onSelectFilter = (type) => {
    setFilter(type);

    if (type === '') props.clearFilter();
    else props.addFilter(type);
    props.getSalesWithFilter(session.user.auth_token);
  };

  const onSelectDelete = () => {
    props.addDelete();
    props.addFilter('pending');
    props.getSalesWithFilter(session.user.auth_token);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="max-w-7xl">
          <ul className="flex list-none flex-wrap flex-row" role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'transition ease-in duration-200 hover:bg-gray-800 cursor-pointer hover:text-white text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal p-5 ' +
                  (openTab === 1
                    ? 'text-white bg-gray-600'
                    : 'text-gray-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                  onSelectFilter('');
                }}
                data-toggle="tab"
                role="tablist"
              >
                <i className="fas fa-border-all text-base mr-1"></i> All
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                class={
                  'transition ease-in duration-200 hover:bg-yellow-600 cursor-pointer hover:text-white text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal p-5 ' +
                  (openTab === 2
                    ? 'text-white bg-orange-500'
                    : 'text-gray-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                  onSelectFilter('pending');
                }}
                data-toggle="tab"
                role="tablist"
              >
                <i className="fas fa-clock text-base mr-1"></i> Pending
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'transition ease-in duration-200 hover:bg-green-600 cursor-pointer hover:text-white text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal p-5  ' +
                  (openTab === 3
                    ? 'text-white bg-green-500'
                    : 'text-gray-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                  onSelectFilter('paid');
                }}
                data-toggle="tab"
                role="tablist"
              >
                <i className="fas fa-check text-base mr-1"></i> Paid
              </a>
            </li>{' '}
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'transition ease-in duration-200 hover:bg-red-600 cursor-pointer hover:text-white text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal p-5  ' +
                  (openTab === 4
                    ? 'text-white bg-red-500'
                    : 'text-gray-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                  onSelectFilter('cancelled');
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-ban text-base mr-1"></i> Cancelled
              </a>
            </li>
            {session.user.user.is_superuser ? (
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    'transition ease-in duration-200 hover:bg-red-600 cursor-pointer hover:text-white text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal p-5  ' +
                    (openTab === 5
                      ? 'text-white bg-red-500'
                      : 'text-gray-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                    onSelectDelete();
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <i className="fas fa-trash-alt text-base mr-1"></i> Delete
                  Pending
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderTab;
