import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';

// components

import TableDropdown from '../Dropdowns/TableDropdown.js';

import FormModal from '../Modals/PurchaseModals/FormModal';
import DetailsModal from '../Modals/PurchaseModals/DetailsModal';
import EditModal from '../Modals/PurchaseModals/EditModal';
import SuccessModal from '../Modals/SuccessModal';

import OrderTab from '../Tabs/OrderTab';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import * as ordersActions from '../../redux/actions/orderActions';
import * as localStorage from '../../utils/local-storage';
const OrdersTable = (props) => {
  const [showFormModal, setFormShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [session, loading] = useSession();

  const [successModal, setSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalError, setModalError] = useState(false);

  const onPressRow = (item) => {
    setShowDetailsModal(true);
    setSelectedItem(item);
  };

  const onPressNumber = (event) => {
    if (parseInt(event.target.innerText) === 1) {
      props.getNextItems(session.user.auth_token, 0, 0);
    } else {
      var multiplier = (parseInt(event.target.innerText) - 1) * 10;

      props.getNextItems(
        session.user.auth_token,
        multiplier,
        parseInt(event.target.innerText)
      );
    }
  };

  const onPressNext = () => {
    props.getNextItems(
      session.user.auth_token,
      props.offSet + 10,
      props.page + 1
    );
  };

  const onPressPrev = () => {
    props.getNextItems(
      session.user.auth_token,
      props.offSet - 10,
      props.page - 1
    );
  };

  const renderPagination = () => {
    var pagination = [];
    var maxPages = Math.ceil(props.totalCount / 10);
    var indexStart =
      parseInt(props.page) >= 5
        ? parseInt(props.page) === maxPages - 1
          ? 1
          : props.page - 4
        : 0;

    for (var i = indexStart + 1; i <= maxPages; i++) {
      pagination.push(
        <>
          <a
            key={i}
            onClick={onPressNumber}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              props.page === maxPages && i === maxPages
                ? 'pointer-events-none'
                : 'cursor-pointer'
            } ${
              props.page <= 1 && i === indexStart + 1
                ? 'pointer-events-none'
                : 'cursor-pointer'
            }`}
          >
            {i}
          </a>
        </>
      );
    }
    return pagination;
  };

  return (
    <>
      <FormModal
        showModal={showFormModal}
        closeModal={() => setFormShowModal(false)}
        paymentTypes={props.paymentTypes}
        setSuccessModal={setSuccessModal}
        setModalMessage={setModalMessage}
        setModalError={setModalError}
      />
      <DetailsModal
        selectedItem={selectedItem}
        isPaid={
          !!(
            selectedItem.status === 'paid' ||
            selectedItem.status === 'cancelled'
          )
        }
        forDelete={selectedItem.for_delete}
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
        paymentTypes={props.paymentTypes}
        setSuccessModal={setSuccessModal}
        setModalMessage={setModalMessage}
        setModalError={setModalError}
      />
      <EditModal
        showModal={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
      <SuccessModal
        showModal={successModal}
        setSuccessModal={setSuccessModal}
        closeModal={() => setSuccessModal(false)}
        message={modalMessage}
        hasError={modalError}
      />

      <div className="flex flex-row justify-between">
        <OrderTab
          getSalesWithFilter={props.getOrders}
          addFilter={props.addFilter}
          clearFilter={props.clearFilter}
          addDelete={props.addDelete}
          clearDelete={props.clearDelete}
        />
        <button
          className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setFormShowModal(true)}
        >
          Create Purchase Order
        </button>
      </div>
      <div
        className={
          'mt-4 relative flex flex-col min-w-0 break-words w-full mb-12 flex-1 shadow-lg rounded '
        }
      >
        <div className="block w-full minoverflow-x-auto overflow-y-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-gray-100 ">
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Purchase Order Number
                </th>

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Amount
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Status
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Payment Type
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Created By
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Date Created
                </th>

                {/* <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                ></th> */}
              </tr>
            </thead>
            <tbody>
              {props.orders.length > 0 ? (
                <>
                  {props.orders.map((item, index) => (
                    <tr
                      onClick={() => onPressRow(item)}
                      className="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
                    >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                        <span className={'ml-3 font-bold '}>
                          {item.order_number}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {`₱${item.total} PHP`}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.status === 'paid' ? (
                          <i className="fas fa-circle text-green-500 mr-2"></i>
                        ) : item.status === 'pending' ? (
                          <i className="fas fa-circle text-orange-500 mr-2"></i>
                        ) : item.status === 'cancelled' ? (
                          <i className="fas fa-circle text-red-500 mr-2"></i>
                        ) : null}
                        {item.status.toUpperCase()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.payment_details
                          ? item.payment_details.type.name
                          : 'N/A'}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.created_by.first_name +
                          ' ' +
                          item.created_by.last_name}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {moment(item.created)
                          .format('MMM DD, YYYY')
                          .toUpperCase()}
                      </td>

                      {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
                        <TableDropdown
                          setShowEditModal={setShowEditModal}
                          showEditModal={showEditModal}
                          isClicked={props.isClicked}
                          setSelectedItem={setSelectedItem}
                          item={item}
                          deleteItem={props.deleteSales}
                          status={item.status}
                        />
                      </td> */}
                    </tr>
                  ))}
                </>
              ) : (
                <tr class="bg-gray-100 text-gray-800 border-gray-200">
                  <td
                    colSpan="7"
                    align="center"
                    className="border-t-0 px-6 self-center align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4"
                  >
                    <span className={'ml-3 font-bold '}>No orders to show</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing{' '}
                <span class="font-medium">
                  {parseInt(props.offSet) === 0
                    ? props.orders.length === 0
                      ? 0
                      : parseInt(props.offSet) + 1
                    : parseInt(props.offSet)}
                </span>{' '}
                to{' '}
                <span class="font-medium">
                  {props.page <= 1
                    ? props.orders.length
                    : parseInt(props.offSet) + props.orders.length}{' '}
                </span>
                of <span class="font-medium">{props.totalCount} </span>
                items
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  onClick={onPressPrev}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    props.page <= 1 ? 'pointer-events-none' : 'cursor-pointer'
                  }`}
                >
                  <span className="sr-only">Previous</span>

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {props.totalCount <= 2 ? (
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                ) : (
                  renderPagination()
                )}

<a
                  onClick={onPressNext}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    10 * props.page >= props.totalCount || props.totalCount < 10
                      ? 'pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                >
                  <span className="sr-only">Next</span>

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  offSet: state.orders.ordersOffset,
  totalCount: state.orders.ordersCount,
  page: state.orders.ordersPage,
  items: state.inventory.items,
  paymentTypes: state.sales.paymentTypes,
});

const mapDispatchToProps = (dispatch) => ({
  getNextItems: (authToken, offset, page) =>
    dispatch(ordersActions.getNextItems(authToken, offset, page)),
  getOrdersWithFilter: (authToken, filter) =>
    dispatch(ordersActions.getOrdersWithFilter(authToken, filter)),
  getOrders: (authToken) => dispatch(ordersActions.getOrders(authToken)),
  addFilter: (filter) => dispatch(ordersActions.addFilter(filter)),
  clearFilter: () => dispatch(ordersActions.clearFilter()),
  addDelete: () => dispatch(ordersActions.addDelete()),
  clearDelete: () => dispatch(ordersActions.clearDelete()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrdersTable)
);
