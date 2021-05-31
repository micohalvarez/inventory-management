/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// components

import TableDropdown from '../Dropdowns/TableDropdown.js';
import InventoryType from '../Dropdowns/InventoryType';

import PurchaseFormModal from '../Modals/PurchaseModals/FormModal';
import PurchaseDetailModal from '../Modals/PurchaseModals/DetailsModal';
import SalesDetailsModal from '../Modals/SalesModals/DetailsModal';

import { withRouter } from 'next/router';

import * as dashboardActions from '../../redux/actions/dashboardActions';

import DashboardDropdown from '../Dropdowns/DashboardDropdown';
import moment from 'moment';
import { useSession } from 'next-auth/client';

const DashBoardTable = (props) => {
  const [session, loading] = useSession();

  const [showFormModal, setFormShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  const onPressRow = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  //pagination for all items
  const onPressNumber = (event) => {
    if (parseInt(event.target.innerText) === 1) {
      props.getNextItems(session.user.auth_token, 0, 0);
    } else {
      var multiplier = (parseInt(event.target.innerText) - 1) * 10;

      props.getNextItems(
        session.user.auth_token,
        props.offSet + multiplier,
        props.page + (parseInt(event.target.innerText) - 1)
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
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {i}
          </a>
        </>
      );
    }
    return pagination;
  };

  //inventory modals and items
  const renderInventoryItems = () => {
    return (
      <div className="block w-full overflow-x-auto">
        <span className={'ml-3 font-bold '}>Low on stock Items</span>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="bg-gray-100 ">
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                Item Code
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                Item Name
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                }
              ></th>
            </tr>
          </thead>
          <tbody>
            {props.items.length > 0 ? (
              <>
                {props.items.map((item, index) => (
                  <tr
                    onClick={() => onPressRow(item)}
                    class="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
                  >
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                      <div className="h-14 w-14  bg-white rounded-full border justify-center flex">
                        <img
                          src={
                            item.images[0]
                              ? item.images[0].image
                              : '/img/sketch.jpg'
                          }
                          className="h-full overflow-hidden bg-white rounded-full  object-fit"
                          alt="..."
                        ></img>
                      </div>
                      <span className={'ml-3 font-bold '}>{item.code}</span>
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                      <i
                        className={
                          'fas fa-circle mr-2 ' +
                          (item.stock < 100
                            ? 'text-red-500 '
                            : item.stock >= 100 && item.stock < 500
                            ? 'text-orange-500'
                            : 'text-green-500')
                        }
                      ></i>
                      {item.stock}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
                      <button
                        className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setFormShowModal(true)}
                      >
                        Create Purchase Order
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr class="bg-gray-100 text-gray-800 border-gray-200">
                <td
                  colSpan="3"
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
    );
  };

  const renderSalesDiscountItems = () => {
    return (
      <div className="block w-full overflow-x-auto">
        <span className={'ml-3 font-bold '}>
          For Sales Orders Discount Approval
        </span>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="bg-gray-100 ">
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                Item Code
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                SubTotal
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                To be Discounted
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                Total
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                }
              ></th>
            </tr>
          </thead>
          <tbody>
            {props.items.length > 0 ? (
              <>
                {props.items.map((item, index) => (
                  <tr class="text-gray-800 border-gray-200">
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                      <span className={'ml-3 font-bold '}>
                        {item.order_number}
                      </span>
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                      {item.subtotal}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                      {item.total_discount + '%'}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                      {item.subtotal - item.total * (item.total_discount / 100)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
                      <button
                        className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setSalesDetailModal(true);
                          setSelectedSales(item);
                        }}
                      >
                        View Order Details
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr class="text-gray-800 border-gray-200">
                <td
                  colSpan="5"
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
    );
  };

  const renderDeadlineItems = () => {
    return (
      <div className="block w-full overflow-x-auto">
        <span className={'ml-3 font-bold '}>
          For Sales Orders Discount Approval
        </span>
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="bg-gray-100 ">
            <tr>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                Item Code
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                }
              >
                Payment Date
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                }
              ></th>
            </tr>
          </thead>
          <tbody>
            {props.items.length > 0 ? (
              <>
                {props.items.map((item, index) => (
                  <tr
                    onClick={() => onPressRow(item)}
                    class="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
                  >
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                      <span className={'ml-3 font-bold '}>
                        {item.order_number}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                      {moment(item.payment_details.pdc_date)
                        .format('MMM DD, YYYY')
                        .toUpperCase()}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
                      <button
                        className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          if (props.sort === 3) {
                            setSalesDetailModal(true);
                            setSelectedSales(item);
                          } else if (props.sort === 2) {
                            setPurchaseDetailModal(true);
                            setSelectedPurchase(item);
                          }
                        }}
                      >
                        View Order Details
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr class="text-gray-800 border-gray-200">
                <td
                  colSpan="3"
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
    );
  };

  const [salesDetailModal, setSalesDetailModal] = useState(false);
  const [selectedSales, setSelectedSales] = useState(false);
  const [purchaseDetailiModal, setPurchaseDetailModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(false);

  return (
    <>
      <SalesDetailsModal
        selectedItem={selectedSales}
        isPaid={
          !!(
            selectedSales.status === 'paid' ||
            selectedSales.status === 'cancelled'
          )
        }
        showModal={salesDetailModal}
        closeModal={() => setSalesDetailModal(false)}
        paymentTypes={props.paymentTypes}
        authToken={session.user.auth_token}
      />
      <PurchaseDetailModal
        selectedItem={selectedPurchase}
        isPaid={
          !!(
            selectedPurchase.status === 'paid' ||
            selectedPurchase.status === 'cancelled'
          )
        }
        showModal={purchaseDetailiModal}
        closeModal={() => setPurchaseDetailModal(false)}
        paymentTypes={props.paymentTypes}
        authToken={session.user.auth_token}
      />

      <div className="flex flex-row flex-1">
        <DashboardDropdown
          sort={[
            'Low on Stock',
            'For Sales Orders Discounts',
            'Upcoming Purchase Payments',
            'Upcoming Sales Payments',
          ]}
          getItems={props.getItems}
          getDiscountApproveSales={props.getDiscountApproveSales}
          getPurchaseOrdersDeadline={props.getPurchaseOrdersDeadline}
          getSalesOrdersDeadline={props.getSalesOrdersDeadline}
        />
      </div>
      <div
        className={
          'mt-4 relative flex flex-col min-w-0 break-words w-full mb-12 flex-1 shadow-lg rounded '
        }
      >
        {props.sort === 0
          ? renderInventoryItems()
          : props.sort === 1
          ? renderSalesDiscountItems()
          : renderDeadlineItems()}

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
                  {parseInt(props.offSet) === 0
                    ? props.items.length === 0
                      ? 0
                      : parseInt(props.offSet) + 1
                    : parseInt(props.offSet)}
                </span>{' '}
                to{' '}
                <span class="font-medium">
                  {props.page <= 1
                    ? props.items.length
                    : parseInt(props.offSet) + props.items.length}{' '}
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
  items: state.dashboard.items,
  categories: state.dashboard.categories,
  totalCount: state.dashboard.totalCount,
  offSet: state.dashboard.itemsOffset,
  page: state.dashboard.itemsPage,
  sort: state.dashboard.sort,
  paymentTypes: state.sales.paymentTypes,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (authToken) => dispatch(dashboardActions.getItems(authToken)),
  getNextItems: (authToken) =>
    dispatch(dashboardActions.getNextItems(authToken)),
  getDiscountApproveSales: (authToken) =>
    dispatch(dashboardActions.getDiscountApproveSales(authToken)),
  getNextDiscountApproveSales: (authToken) =>
    dispatch(dashboardActions.getNextDiscountApproveSales(authToken)),
  getPurchaseOrdersDeadline: (authToken) =>
    dispatch(dashboardActions.getPurchaseOrdersDeadline(authToken)),
  getNextPurchaseOrdersDeadline: (authToken) =>
    dispatch(dashboardActions.getNextPurchaseOrdersDeadline(authToken)),
  getSalesOrdersDeadline: (authToken) =>
    dispatch(dashboardActions.getSalesOrdersDeadline(authToken)),
  getNextSalesOrdersDeadline: (authToken) =>
    dispatch(dashboardActions.getNextSalesOrdersDeadline(authToken)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashBoardTable)
);
