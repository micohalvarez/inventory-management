import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components

import TableDropdown from '../Dropdowns/TableDropdown.js';

import FormModal from '../Modals/SalesModals/FormModal';
import DetailsModal from '../Modals/SalesModals/DetailsModal';
import EditModal from '../Modals/SalesModals/EditModal';
import Tabs from '../Tabs';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as salesActions from '../../redux/actions/salesActions';
import moment from 'moment';
import * as localStorage from '../../utils/local-storage';
const SalesTable = (props) => {
  const [showFormModal, setFormShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isPaid, setPaid] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  const onPressRow = (item) => {
    setShowDetailsModal(true);
    setSelectedItem(item);
  };

  const onPressNumber = (event) => {
    if (parseInt(event.target.innerText) === 1) {
      props.getNextItems(
        localStorage.getLocalStorage('authCreds').authToken,
        0,
        0
      );
    } else {
      var multiplier = (parseInt(event.target.innerText) - 1) * 10;

      props.getNextItems(
        localStorage.getLocalStorage('authCreds').authToken,
        props.offSet + multiplier,
        props.page + (parseInt(event.target.innerText) - 1)
      );
    }
  };
  const onPressNext = () => {
    props.getNextItems(
      localStorage.getLocalStorage('authCreds').authToken,
      props.offSet + 10,
      props.page + 1
    );
  };
  const onPressPrev = () => {
    props.getNextItems(
      localStorage.getLocalStorage('authCreds').authToken,
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
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
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
        authToken={props.authToken}
        paymentTypes={props.paymentTypes}
      />
      <DetailsModal
        selectedItem={selectedItem}
        isPaid={
          selectedItem.status === 'paid' || selectedItem.status === 'cancelled'
            ? true
            : false
        }
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
        paymentTypes={props.paymentTypes}
        authToken={props.authToken}
      />
      <EditModal
        showModal={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
      <div className="flex flex-row justify-between">
        <Tabs
          getSalesWithFilter={props.getSales}
          addFilter={props.addFilter}
          clearFilter={props.clearFilter}
          addDiscount={props.addDiscount}
          clearDiscount={props.clearDiscount}
          discounted={props.discounted}
        />
        <button
          className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setFormShowModal(true)}
        >
          Create Sales Order
        </button>
      </div>
      <div
        className={
          'mt-4 relative flex flex-col min-w-0 break-words w-full mb-12 flex-1 shadow-lg rounded '
        }
      >
        <div className="block w-full minoverflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-gray-100 ">
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Sales Order Number
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

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {props.sales ? (
                <>
                  {props.sales.map((item, index) => (
                    <tr
                      onClick={() => onPressRow(item)}
                      class="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
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
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Previous
            </a>
            <a
              href="#"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Next
            </a>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing{' '}
                <span class="font-medium">
                  {' '}
                  {parseInt(props.offSet) === 0
                    ? parseInt(props.offSet) + 1
                    : parseInt(props.offSet)}{' '}
                </span>
                to{' '}
                <span class="font-medium">
                  {props.page <= 1
                    ? props.sales.length
                    : parseInt(props.offSet) + props.sales.length}{' '}
                </span>
                of <span class="font-medium">{props.totalCount} </span>
                items
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  onClick={onPressPrev}
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Previous</span>

                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                {props.totalCount <= 2 ? (
                  <a
                    href="#"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                ) : (
                  renderPagination()
                )}

                <a
                  onClick={onPressNext}
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Next</span>

                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
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
  sales: state.sales.sales,
  offSet: state.sales.salesOffset,
  totalCount: state.sales.salesCount,
  items: state.inventory.items,
  page: state.sales.salesPage,
  discounted: state.sales.discounted,
  paymentTypes: state.sales.paymentTypes,
});

const mapDispatchToProps = (dispatch) => ({
  getSales: (authToken) => dispatch(salesActions.getSales(authToken)),
  getSalesWithFilter: (authToken, filter) =>
    dispatch(salesActions.getSalesWithFilter(authToken, filter)),
  getNextItems: (authToken, offset, page) =>
    dispatch(salesActions.getNextItems(authToken, offset, page)),
  addFilter: (filter) => dispatch(salesActions.addFilter(filter)),
  clearFilter: () => dispatch(salesActions.clearFilter()),
  addDiscount: () => dispatch(salesActions.addDiscount()),
  clearDiscount: () => dispatch(salesActions.clearDiscount()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SalesTable)
);
