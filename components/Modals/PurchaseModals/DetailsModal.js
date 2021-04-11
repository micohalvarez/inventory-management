import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as salesActions from '../../../redux/actions/salesActions';
import * as orderActions from '../../../redux/actions/orderActions';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
const DetailsModal = (props) => {
  console.log(props, 'test');
  const [newItems, setNewitems] = useState([
    <>
      <tr
        onClick={() => {
          addNewItem();
        }}
        className="hover:bg-green-500 hover:text-white cursor-pointer  bg-gray-200 justify-center align-center text-gray-800 border-gray-200 "
      >
        <td colSpan="6" align="center" className="py-3">
          <span className="ml-3  font-bold align-center text-center">
            <i className="fas fa-plus mr-2"></i> Add Item
          </span>
        </td>
      </tr>
    </>,
  ]);

  const [isContinue, setContinue] = useState(false);

  const [paymentType, setPaymentType] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [accountNum, setAccountNum] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [paymentDate, setPaymentDate] = useState(new Date());

  const handlePaymentType = (event) => {
    event.preventDefault();

    setPaymentType(event.target.value);
  };
  const handleAccountNum = (event) => {
    event.preventDefault();

    setAccountNum(event.target.value);
  };
  const handleAccountName = (event) => {
    event.preventDefault();
    setAccountName(event.target.value);
  };
  const handleBankName = (event) => {
    event.preventDefault();
    setBankName(event.target.value);
  };
  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    const payload = {
      order: props.selectedItem.id,
      type: paymentType,
      bank_name: bankName,
      account_name: accountName,
      accountNum: accountNum,
      pdc_date: moment(paymentDate).format('YYYY-MM-DD'),
    };
    props.addPaymentMethod(props.authToken, payload);
    clearState();
  };

  const markPaid = (event) => {
    event.preventDefault();

    props
      .markPaid(props.authToken, props.selectedItem.uuid)
      .then((res) => {
        if (res.status === 200) {
          alert('Purchase order has bene marked as paid');
          props.getOrders(props.authToken);
        } else alert('Purchase order cannot be marked as paid');
      })
      .catch(({ response }) => {
        alert('An error has occurred');
      });
    clearState();
  };

  const markCancel = (event) => {
    event.preventDefault();

    props
      .markCancel(props.authToken, props.selectedItem.uuid)
      .then((res) => {
        if (res.status === 200) {
          alert('Purchase order has bene marked as cancelled');
          props.getOrders(props.authToken);
        } else alert('Purchase order cannot be marked as cancelled');
      })
      .catch(({ response }) => {
        alert('An error has occurred');
      });
    clearState();
  };

  const clearState = () => {
    props.closeModal();
    setContinue(false);
    setNewitems([
      <>
        <tr
          onClick={() => {
            addNewItem();
          }}
          className="hover:bg-green-500 hover:text-white cursor-pointer  bg-gray-200 justify-center align-center text-gray-800 border-gray-200 "
        >
          <td colSpan="6" align="center" className="py-3">
            <span className="ml-3  font-bold align-center text-center">
              <i className="fas fa-plus mr-2"></i> Add Item
            </span>
          </td>
        </tr>
      </>,
    ]);
  };

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3 ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {isContinue
                      ? 'Add Payment Method Details'
                      : 'Purchase Order Details'}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      clearState();
                    }}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md bg-">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      {!isContinue ? (
                        <>
                          <div className="grid grid-cols-9 gap-6">
                            <div className="col-span-8 sm:col-span-3">
                              <label
                                for="sales_number"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Sales Order Number
                              </label>
                              <p className="block text-base font-medium">
                                {props.selectedItem.order_number}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="customer_name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Created By
                              </label>
                              <p className="block text-base font-medium">
                                {props.selectedItem.created_by.first_name +
                                  ' ' +
                                  props.selectedItem.created_by.last_name}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="sales_date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Date Created
                              </label>
                              <p className="block text-base font-medium ">
                                {moment(props.selectedItem.created)
                                  .format('MMM DD, YYYY')
                                  .toUpperCase()}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="payment_type"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Status
                              </label>
                              <p className="block text-base font-medium ">
                                {props.selectedItem.status.toUpperCase()}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="shipment_date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Payment Type
                              </label>
                              <p className="block text-base font-medium ">
                                {props.selectedItem.payment_details
                                  ? props.selectedItem.payment_details.type.name
                                  : 'N/A'}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="shipment_date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Payment Date
                              </label>
                              <p className="block text-base font-medium ">
                                {props.selectedItem.payment_details === null
                                  ? 'N/A'
                                  : props.selectedItem.payment_details.type
                                      .id !== 2
                                  ? moment(
                                      props.selectedItem.payment_details.created
                                    )
                                      .format('MMM DD, YYYY')
                                      .toUpperCase()
                                  : moment(
                                      props.selectedItem.payment_details
                                        .pdc_date
                                    )
                                      .format('MMM DD, YYYY')
                                      .toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <table className="items-center w-full bg-transparent border-collapse">
                              <thead className="bg-gray-100 ">
                                <tr>
                                  <th
                                    className={
                                      'px-6 align-middle border border-solid py-3 text-sm uppercase border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                    }
                                  >
                                    Item Code
                                  </th>
                                  <th
                                    className={
                                      'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                    }
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    className={
                                      'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                    }
                                  >
                                    Price per item
                                  </th>

                                  <th
                                    className={
                                      'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                    }
                                  >
                                    Total Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.keys(props.selectedItem.items).map(
                                  (name, index) => (
                                    <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
                                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                                        <span className={'ml-3 font-bold '}>
                                          {
                                            props.selectedItem.items[index]
                                              .product_code
                                          }
                                        </span>
                                      </th>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                        {'x' +
                                          props.selectedItem.items[index]
                                            .quantity}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                        {`₱${props.selectedItem.items[index].unit_price} PHP`}
                                      </td>

                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                        {`₱ ${(
                                          props.selectedItem.items[index]
                                            .quantity *
                                          parseFloat(
                                            props.selectedItem.items[index]
                                              .unit_price
                                          )
                                        ).toFixed(2)} PHP`}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                              <tfoot>
                                <th
                                  className={
                                    'px-6  py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                  }
                                  colSpan="3"
                                  align="end"
                                >
                                  <span>Total Amount</span>
                                </th>
                                <td
                                  className={
                                    ' px-6 py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                  }
                                >
                                  <span>{`₱ ${props.selectedItem.total} PHP`}</span>
                                </td>
                              </tfoot>
                            </table>
                          </div>
                        </>
                      ) : (
                        <div className="mt-5 md:mt-0 md:col-span-2">
                          <div className="shadow overflow-hidden sm:rounded-md bg-">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-8 sm:col-span-3">
                                  <label
                                    for="sales_number"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Purchase Order Number
                                  </label>
                                  <p className="block text-base font-medium">
                                    {props.selectedItem.order_number}
                                  </p>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="customer_name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Status
                                  </label>
                                  <p className="block text-base font-medium">
                                    {props.selectedItem.status.toUpperCase()}
                                  </p>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Sales Order Date
                                  </label>
                                  <p className="block text-base font-medium ">
                                    {props.selectedItem.created}
                                  </p>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Total Amount
                                  </label>
                                  <p className="block text-base font-medium ">
                                    {'₱' + props.selectedItem.total + ' PHP'}
                                  </p>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Payment Type
                                  </label>
                                  <select
                                    onChange={(event) => {
                                      handlePaymentType(event);
                                    }}
                                    id="item_type"
                                    placeholder="Item Type/Category"
                                    name="item_type"
                                    autocomplete="item_type"
                                    class="mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    <option
                                      class="text-color-gray-300"
                                      value=""
                                      disabled
                                      hidden
                                      selected
                                    >
                                      Item Type/Category
                                    </option>

                                    {props.paymentTypes.map((test) => (
                                      <option key={test.id} value={test.id}>
                                        {test.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Account Number
                                  </label>
                                  <input
                                    value={accountNum}
                                    onChange={handleAccountNum}
                                    disabled={
                                      paymentType === null || paymentType < 2
                                        ? true
                                        : false
                                    }
                                    type="text"
                                    placeholder="Account Number"
                                    name="account_number"
                                    id="account_number"
                                    autocomplete="given-name"
                                    className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Bank Name
                                  </label>
                                  <input
                                    value={bankName}
                                    onChange={handleBankName}
                                    disabled={
                                      paymentType === null || paymentType < 2
                                        ? true
                                        : false
                                    }
                                    type="text"
                                    placeholder="Bank Name"
                                    name="bank_name"
                                    id="bank_name"
                                    autocomplete="given-name"
                                    className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Amount Date
                                  </label>
                                  <DatePicker
                                    disabled={
                                      paymentType === null || paymentType < 2
                                        ? true
                                        : false
                                    }
                                    className="mt-1 py-2 px-2 w-full focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    selected={paymentDate}
                                    onChange={(date) => {
                                      setPaymentDate(date);
                                      console.log(date);
                                    }}
                                  />
                                </div>
                              </div>
                              {/* <div className="mt-4">
                                <table className="items-center w-full bg-transparent border-collapse">
                                  <thead className="bg-gray-100 ">
                                    <tr>
                                      <th
                                        className={
                                          'px-6 align-middle border border-solid py-3 text-sm uppercase border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                        }
                                      >
                                        Sales Order Number
                                      </th>
                                      <th
                                        className={
                                          'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                        }
                                      >
                                        Quantity
                                      </th>
                                      <th
                                        className={
                                          'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                        }
                                      >
                                        Price
                                      </th>
                                      <th
                                        className={
                                          'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                        }
                                      >
                                        Discount
                                      </th>
                                      <th
                                        className={
                                          'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200'
                                        }
                                      >
                                        Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>{finalItems}</tbody>
                                  <tfoot>
                                    <th
                                      className={
                                        'px-6  py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                      }
                                      colSpan="4"
                                      align="end"
                                    >
                                      <span>Total Amount</span>
                                    </th>
                                    <td
                                      className={
                                        ' px-6 py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                      }
                                    >
                                      <span>₱10,000 PHP</span>
                                    </td>
                                  </tfoot>
                                </table> */}
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 text-right ">
                        {props.isPaid ? (
                          <button
                            className="bg-red-600 text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => props.closeModal()}
                          >
                            Close
                          </button>
                        ) : props.selectedItem.payment_details !== null &&
                          props.selectedItem.payment_details.type.id === 2 ? (
                          <>
                            <button
                              className="bg-transparent text-black hover:text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => props.closeModal()}
                            >
                              Close
                            </button>
                            <button
                              className="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(event) => {
                                markPaid(event);
                              }}
                            >
                              Mark as Paid
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-transparent text-black hover:text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => props.closeModal()}
                            >
                              Close
                            </button>
                            <button
                              className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(event) => {
                                markCancel(event);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(event) => {
                                !isContinue
                                  ? setContinue(true)
                                  : handlePaymentSubmit(event);
                              }}
                            >
                              {!isContinue ? 'Add Payment' : 'Accept'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  items: state.inventory.items,
  newOrder: state.sales.newOrder,
});

const mapDispatchToProps = (dispatch) => ({
  createSalesOrder: (authToken, payload, setContinue) =>
    dispatch(salesActions.createSalesOrder(authToken, payload, setContinue)),
  addPaymentMethod: (authToken, payload) =>
    dispatch(salesActions.addPaymentMethod(authToken, payload)),
  markPaid: (authToken, uuid) =>
    dispatch(orderActions.markPaid(authToken, uuid)),
  markCancel: (authToken, uuid) =>
    dispatch(orderActions.cancelOrder(authToken, uuid)),
  getOrders: (token) => {
    dispatch(orderActions.getOrders(token));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsModal)
);
