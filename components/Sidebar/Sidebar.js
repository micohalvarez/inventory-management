import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NotificationDropdown from '../Dropdowns/NotificationDropdown.js';
import UserDropdown from '../Dropdowns/UserDropdown.js';

const Sidebar = (props) => {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const router = useRouter();
  console.log(props, 'sidebar');
  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}

        <div
          className={
            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
            collapseShow
          }
        >
          {/* Heading */}
          <h6 className="md:min-w-full text-gray-600 text-sm uppercase font-bold block pt-1 pb-4 no-underline">
            Inventory Management System
          </h6>
          {/* Navigation */}

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link href="/admin/dashboard">
                <a
                  className={
                    'text-sm uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/admin/dashboard') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-800 hover:text-gray-600')
                  }
                >
                  <i
                    className={
                      'fas fa-table mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/dashboard') !== -1
                        ? 'opacity-75'
                        : 'text-gray-400')
                    }
                  ></i>{' '}
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="items-center">
              <Link href="/admin/inventory">
                <a
                  className={
                    'text-sm uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/admin/inventory') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-800 hover:text-gray-600')
                  }
                >
                  <i
                    className={
                      'fas fa-table mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/tables') !== -1
                        ? 'opacity-75'
                        : 'text-gray-400')
                    }
                  ></i>{' '}
                  Inventory
                </a>
              </Link>
            </li>
            <li className="items-center">
              <Link href="/admin/sales">
                <a
                  className={
                    'text-sm uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/admin/sales') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-800 hover:text-gray-600')
                  }
                >
                  <i
                    className={
                      'fas fa-table mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/sales') !== -1
                        ? 'opacity-75'
                        : 'text-gray-400')
                    }
                  ></i>{' '}
                  Sales Orders
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/orders">
                <a
                  className={
                    'text-sm uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/admin/orders') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-800 hover:text-gray-600')
                  }
                >
                  <i
                    className={
                      'fas fa-table mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/orders') !== -1
                        ? 'opacity-75'
                        : 'text-gray-400')
                    }
                  ></i>{' '}
                  Purchase Orders
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/users">
                <a
                  className={
                    'text-sm uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/admin/users') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-800 hover:text-gray-600')
                  }
                >
                  <i
                    className={
                      'fas fa-users mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/users') !== -1
                        ? 'opacity-75'
                        : 'text-gray-400')
                    }
                  ></i>{' '}
                  users
                </a>
              </Link>
            </li>

            <li className="items-center">
              <Link href="/admin/settings">
                <a
                  className={
                    'text-sm uppercase py-3 font-bold block ' +
                    (router.pathname.indexOf('/admin/settings') !== -1
                      ? 'text-blue-500 hover:text-blue-600'
                      : 'text-gray-800 hover:text-gray-600')
                  }
                >
                  <i
                    className={
                      'fas fa-tools mr-2 text-sm ' +
                      (router.pathname.indexOf('/admin/settings') !== -1
                        ? 'opacity-75'
                        : 'text-gray-400')
                    }
                  ></i>{' '}
                  Settings
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
