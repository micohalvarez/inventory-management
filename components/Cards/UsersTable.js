/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components

import TableDropdown from '../Dropdowns/TableDropdown.js';

import InventoryType from '../Dropdowns/InventoryType';

import FormModal from '../Modals/UserModals/FormModal';
import DetailsModal from '../Modals/UserModals/DetailsModal';
import EditModal from '../Modals/UserModals/EditModal';
import { useSession } from 'next-auth/client';

const UsersTable = (props) => {
  const [showFormModal, setFormShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [session, loading] = useSession();

  const onPressRow = () => {
    setShowDetailsModal(true);
  };

  console.log(props);

  return (
    <>
      <FormModal
        showModal={showFormModal}
        closeModal={() => setFormShowModal(false)}
      />
      <DetailsModal
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
      />
      <EditModal
        showModal={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />

      <button
        className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setFormShowModal(true)}
      >
        Create New User
      </button>

      <div
        className={
          'mt-4 relative flex flex-col min-w-0 break-words w-full mb-12 flex-1 shadow-lg rounded '
        }
      >
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-gray-100 ">
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  User ID
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Full Name
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                  }
                >
                  City Address
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                  }
                >
                  Username
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Active
                </th>

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {props.users ? (
                <>
                  {props.users.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => onPressRow(item)}
                      className="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
                    >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                        <img
                          src={'/img/sketch.jpg'}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>
                        <span className={'ml-3 font-bold '}>
                          {'0000' + item.id}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.first_name + ' ' + item.last_name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.city ? item.city : 'NCR'}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.username}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.is_active ? 'TRUE' : 'FALSE'}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
                        <TableDropdown
                          setShowEditModal={setShowEditModal}
                          showEditModal={showEditModal}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
