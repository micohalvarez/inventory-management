/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
// components

import TableDropdown from '../Dropdowns/TableDropdown.js';

import InventoryType from '../Dropdowns/InventoryType';
import InventoryFilter from '../Dropdowns/InventoryFilter';

import FormModal from '../Modals/InventoryModals/FormModal';
import ReportsModal from '../Modals/InventoryModals/ReportModal';
import DetailsModal from '../Modals/InventoryModals/DetailsModal';
import EditModal from '../Modals/InventoryModals/EditModal';
import Router, { withRouter } from 'next/router';

import moment from 'moment';

import { connect } from 'react-redux';
import * as inventoryActions from '../../redux/actions/inventoryActions';
import * as localStorage from '../../utils/local-storage';

const InventoryTable = (props) => {
  const [showFormModal, setFormShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [session, loading] = useSession();

  const onPressRow = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
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
        getItems={props.getItems}
        addItem={props.addItem}
        showModal={showFormModal}
        categories={props.categories}
        closeModal={() => setFormShowModal(false)}
      />
      <DetailsModal
        selectedItem={selectedItem}
        showModal={showDetailsModal}
        closeModal={() => setShowDetailsModal(false)}
      />
      <EditModal
        getItems={props.getItems}
        editItem={props.editItem}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        categories={props.categories}
        showModal={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />

      <ReportsModal
        allItems={props.allItems}
        showModal={showReportsModal}
        getOrdersPerItem={props.getOrdersPerItem}
        closeModal={() => setShowReportsModal(false)}
      />

      <div className="flex flex-row ">
        <div className="flex flex-row flex-1">
          <InventoryType
            categories={props.categories}
            getItemsWithFilter={props.getItemsWithFilter}
            addFilter={props.addFilter}
            clearFilter={props.clearFilter}
            getItems={props.getItems}
            isClicked={props.isClicked}
          />
          <InventoryFilter
            sort={['Name', 'Price', 'Type/Brand', 'Stock', 'Date Created']}
            getItemsWithOrdering={props.getItemsWithOrdering}
            getItems={props.getItems}
            addSort={props.addSort}
            clearSort={props.clearSort}
            isClicked={props.isClicked}
          />
        </div>
        <div className=" flex flex-1 justify-end">
          <button
            className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowReportsModal(true)}
          >
            Generate Orders Report
          </button>
          <button
            className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setFormShowModal(true)}
          >
            Add a new Item
          </button>
        </div>
      </div>
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
                >
                  Price
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                  }
                >
                  Type/Brand
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                >
                  Stock on Hand
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                  }
                >
                  Date Created
                </th>
                {session.user.user.is_superuser ? (
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left'
                    }
                  >
                    Cost
                  </th>
                ) : null}
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {props.items.length > 0 ? (
                <>
                  {props.items.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => onPressRow(item)}
                      className="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
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
                        <span className={'ml-3 font-bold'}>{item.code}</span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {`₱${item.unit_price} PHP`}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {item.category.name}
                      </td>
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

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                        {moment(item.created)
                          .format('MMM DD, YYYY')
                          .toUpperCase()}
                      </td>
                      {session.user.user.is_superuser ? (
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                          {item.cost}
                        </td>
                      ) : null}

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-right">
                        <TableDropdown
                          setShowEditModal={setShowEditModal}
                          showEditModal={showEditModal}
                          isClicked={props.isClicked}
                          setSelectedItem={setSelectedItem}
                          item={item}
                          deleteItem={props.deleteItem}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="bg-gray-100 text-gray-800 border-gray-200">
                  <td
                    colSpan="8"
                    align="center"
                    className="border-t-0 px-6 self-center align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4"
                  >
                    <span className={'ml-3 font-bold '}>No items to show</span>
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
  items: state.inventory.items,
  totalCount: state.inventory.totalCount,
  offSet: state.inventory.itemsOffset,
  page: state.inventory.itemsPage,
  categories: state.inventory.categories,
  itemOrders: state.inventory.itemOrders,
  allItems: state.inventory.allItems,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (authToken) => dispatch(inventoryActions.getItems(authToken)),
  getItemsWithFilter: (authToken, filter) =>
    dispatch(inventoryActions.getItemsWithFilter(authToken, filter)),
  getItemsWithOrdering: (authToken, filter) =>
    dispatch(inventoryActions.getItemsWithOrdering(authToken, filter)),
  getNextItems: (authToken, offset, page) =>
    dispatch(inventoryActions.getNextItems(authToken, offset, page)),
  addItem: (authToken, payload) =>
    dispatch(inventoryActions.addItem(authToken, payload)),
  editItem: (authToken, payload, slug) =>
    dispatch(inventoryActions.editItem(authToken, payload, slug)),
  getItems: (authToken, payload) =>
    dispatch(inventoryActions.getItems(authToken, payload)),
  addSort: (sort) => dispatch(inventoryActions.addSort(sort)),
  clearSort: () => dispatch(inventoryActions.clearSort()),
  addFilter: (filter) => dispatch(inventoryActions.addFilter(filter)),
  clearFilter: () => dispatch(inventoryActions.clearFilter()),
  getOrdersPerItem: (authToken, slug, date) =>
    dispatch(inventoryActions.getOrdersPerItem(authToken, slug, date)),
  deleteItem: (authToken, slug) =>
    dispatch(inventoryActions.deleteItem(authToken, slug)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryTable)
);
