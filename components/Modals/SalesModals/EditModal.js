import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as salesActions from '../../../redux/actions/salesActions';
import { Alert } from 'reactstrap';
import { useSession } from 'next-auth/client';
import SuccessModal from '../SuccessModal';
const EditModal = (props) => {
  const [session, loading] = useSession();

  const [modalError, setModalError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [successModal, setSuccessModal] = useState(false);

  const [items, setItems] = useState([
    { type: null, product: null, price: 0, quantity: 1 },
  ]);

  const [submitItems, setSubmitItems] = useState([
    { product: null, quantity: 1 },
  ]);

  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [quantity, setQuantity] = useState([0]);
  const [choices, setChoices] = useState(props.items);
  const [isContinue, setContinue] = useState(false);

  const [newItems, setNewitems] = useState([]);

  useEffect(() => {
    if (props.selectedItem) {

      setTotalAmount(props.selectedItem.total);

      setTotalDiscount(props.selectedItem.total_discount * 10);

      var newItems = [];
      props.selectedItem.items.map((item, index) => {

        newItems.push([{ type: null, product: null, price: 0, quantity: 1 }]);
        newItems[index].type = item.product.category.id;
        newItems[index].product = item.product.id;
        newItems[index].quantity = item.quantity;
        newItems[index].price = item.quantity * item.unit_price;
      });
      setItems(newItems);
    }
  }, [props.selectedItem]);

  const [finalItems, setFinalItems] = useState([
    <>
      <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
          <span className={'ml-3 font-bold '}>Item 0001</span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          x200
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          ???5,000 PHP
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          No Discount
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          ???5,000 PHP
        </td>
      </tr>
      <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
          <span className={'ml-3 font-bold '}>Item 0002</span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          x200
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          ???5,000 PHP
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          No Discount
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          ???5,000 PHP
        </td>
      </tr>
    </>,
  ]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const addNewItem = () => {
    let testItems = [...items];
    let subItems = [...submitItems];

    testItems.push({
      type: null,
      product: null,
      quantity: 1,
      price: 0,
    });
    subItems.push({ product: null, quantity: 1 });

    setSubmitItems(subItems);

    setItems(testItems);
  };

  const removeItem = (event, indexItem) => {
    event.preventDefault();
    if (items.length === 1) {
      setModalError(true);
      setSuccessModal(true);
      setModalMessage('Cannot delete anymore items.');
    } else {
      setItems(items.filter((item, index) => index !== indexItem));

      setSubmitItems(submitItems.filter((item, index) => index !== indexItem));
    }
  };

  const [discountError, setDiscountError] = useState(false);

  const handleDiscount = (event) => {
    event.preventDefault();
    setDiscountError('');
    if (!(event.target.value > 100 || event.target.value < 0)) {
      setTotalDiscount(event.target.value);

    }
  };

  const handleQuantity = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];

    if (!(event.target.value > 10000 || event.target.value < 0)) {
      testItems[index].quantity = event.target.value;

      subItems[index].quantity = event.target.value;

      handleTotalAmount();
      setSubmitItems(subItems);
      setItems(testItems);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleTotalAmount = () => {
    let totalAmount = 0;
    items.map((item) => {
      totalAmount += item.price * item.quantity;
    });

    setTotalAmount(totalAmount);
  };

  const handleName = (event) => {
    event.preventDefault();
    setNameError('');
    setName(event.target.value);
  };

  const handleType = (event, index, id) => {
    event.preventDefault();
    setType(event.target.value);
    let testItems = [...items];

    let subItems = [...submitItems];
    testItems[index].price = props.items[event.target.value].unit_price;
    testItems[index].type = event.target.value;

    subItems[index].product = id;
    subItems[index].quantity = testItems[index].quantity;

    setSubmitItems(subItems);
    setItems(testItems);
    handleTotalAmount();
  };

  const [paymentType, setPaymentType] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [accountNum, setAccountNum] = useState(null);
  const [accountName, setAccountName] = useState(null);

  const handlePaymentType = (event) => {
    event.preventDefault();
    setType(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    var hasError = false;
    submitItems.map((item) => {
      if (item.quantity <= 0) {
        hasError = true;
        setModalMessage('Quantities must be greater than 0.');
      }
      if (item.product === null) {
        hasError = true;
        setModalMessage('Order Form has no products added.');
      }
    });

    if (hasError) {
      setModalError(true);
      setSuccessModal(true);
      return false;
    } else {
      props
        .createSalesOrder(
          session.user.auth_token,
          submitItems,

          totalDiscount
        )
        .then((res) => {
          if (res.status === 200) {
            props.setModalMessage(
              'You have successfully added a new sales order.'
            );
            props.setModalError(false);
            props.setSuccessModal(true);
            props.getSales(session.user.auth_token);
          } else {
            props.setModalMessage('One of the items you added is out of stock');
            props.setModalError(true);
            props.setSuccessModal(true);
          }
        })
        .catch((error) => {
          props.setModalMessage(
            'A server error has occurred. Please try again later'
          );
          props.setModalError(true);
          props.setSuccessModal(true);
        });
      clearState();
    }
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    const payload = {
      order: props.newOrder.id,
      type: paymentType,
      bank_name: bankName,
      account_name: accountName,
      accountNum: accountNum,
    };

    props.addPaymentMethod(session.user.auth_token, payload);
  };
  const clearState = () => {
    props.closeModal();
    setContinue(false);
    setItems([{ type: null, product: null, price: 0, quantity: 1 }]);
    setTotalAmount(0);
    setTotalDiscount(0);
    setTotalDiscountAmount(0);
    setSuccessModal(false);
    setSubmitItems([{ product: null, quantity: 0 }]);
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
                    {isContinue ? 'Sales Order Summary' : 'Create Sales Order'}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      clearState();
                    }}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ??
                    </span>
                  </button>
                </div>
                <SuccessModal
                  showModal={successModal}
                  closeModal={() => setSuccessModal(false)}
                  message={modalMessage}
                  hasError={modalError}
                />
                {true ? (
                  <div className="p-6 flex-auto mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Sales Information
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Input the sales information required.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div className="shadow overflow-hidden sm:rounded-md bg-">
                            <div className="p-6 h-2/5 max-h-80 overflow-y-auto">
                              <table className="items-center w-full bg-transparent border-collapse">
                                <thead className="bg-gray-100 ">
                                  <tr>
                                    <th
                                      className={
                                        'px-6 align-middle border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left '
                                      }
                                    >
                                      Item
                                    </th>
                                    <th
                                      className={
                                        'px-6 align-middle border-l-0 border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Quantity
                                    </th>
                                    <th
                                      className={
                                        'px-6 align-middle border-l-0 border-r-0  border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left '
                                      }
                                    >
                                      Price
                                    </th>

                                    <th
                                      className={
                                        'px-6 align-middle border border-l-0 border-r-0 border-solid py-3 text-sm uppercase whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Amount
                                    </th>
                                    <th
                                      className={
                                        'px-6 align-middle border border-l-0  border-solid py-3 text-sm uppercase whitespace-no-wrap font-semibold text-left'
                                      }
                                    ></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((item, index) => (
                                    <>
                                      <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
                                        <td className="border-t-0 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
                                          <select
                                            onChange={(event) => {
                                              handleType(
                                                event,
                                                index,
                                                props.items[event.target.value]
                                                  .id
                                              );
                                            }}
                                            id="item_type"
                                            placeholder="Item Type/Category"
                                            name="item_type"
                                            autocomplete="item_type"
                                            value={item.type}
                                            class="mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          >
                                            <option
                                              class="text-color-gray-300"
                                              value=""
                                              disabled
                                              hidden
                                              selected
                                            >
                                              Item Type/Brand
                                            </option>

                                            {props.items.map((test, index) => (
                                              <option
                                                key={test.id}
                                                value={index}
                                              >
                                                {test.name}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                          <input
                                            type="number"
                                            disabled={
                                              item.type === null ? true : false
                                            }
                                            value={item.quantity}
                                            onChange={(event) =>
                                              handleQuantity(event, index)
                                            }
                                            placeholder="Quantity"
                                            name="quantity"
                                            id="quantity"
                                            autocomplete="quantity"
                                            class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-half shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                          />
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                          <span>
                                            {numberWithCommas(item.price)}
                                          </span>
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                          <span>
                                            {numberWithCommas(
                                              item.price * item.quantity
                                            )}
                                          </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                          <i
                                            onClick={(event) =>
                                              removeItem(event, index)
                                            }
                                            className="fas fa-trash-alt mr-2 text-red-500 hover:text-red-600 cursor-pointer"
                                          ></i>
                                        </td>
                                      </tr>
                                    </>
                                  ))}
                                  <tr>
                                    <th
                                      className={
                                        'px-6  py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                      }
                                      align="end"
                                    >
                                      <span>Total Discount (%)</span>
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                      <input
                                        min="1"
                                        max="100"
                                        disabled={
                                          items[0].type === null ? true : false
                                        }
                                        maxLength="100"
                                        type="number"
                                        value={totalDiscount}
                                        onChange={(event) =>
                                          handleDiscount(event)
                                        }
                                        placeholder="Discount"
                                        name="discount"
                                        id="discount"
                                        autocomplete="discount"
                                        class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-half shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                      />
                                      {discountError ? (
                                        <span className="text-red-500">
                                          {discountError}
                                        </span>
                                      ) : null}
                                    </td>
                                    <th
                                      className={
                                        'px-6  py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                      }
                                      align="end"
                                    >
                                      <span>Total Discount</span>
                                    </th>
                                    <td
                                      className={
                                        ' px-6 py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                      }
                                    >
                                      <span>{`??? ${
                                        totalDiscount > 0
                                          ? numberWithCommas(
                                              totalAmount *
                                                (totalDiscount / 100)
                                            )
                                          : 0
                                      } PHP`}</span>
                                    </td>
                                  </tr>
                                </tbody>

                                <tfoot>
                                  <th
                                    className={
                                      'px-6  py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                    }
                                    align="end"
                                  >
                                    <span>SubTotal</span>
                                  </th>
                                  <td
                                    className={
                                      ' px-6 py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                    }
                                  >
                                    <span>{`??? ${numberWithCommas(
                                      totalAmount
                                    )} PHP`}</span>
                                  </td>
                                  <th
                                    className={
                                      'px-6  py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                    }
                                    align="end"
                                  >
                                    <span>Total Amount</span>
                                  </th>
                                  <td
                                    className={
                                      ' px-6 py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                    }
                                  >
                                    <span>{`??? ${
                                      totalDiscount
                                        ? totalAmount -
                                          totalAmount * (totalDiscount / 100)
                                        : totalAmount
                                    } PHP`}</span>
                                  </td>
                                </tfoot>
                              </table>
                            </div>

                            <div className="px-4 py-3 text-right sm:px-6 ">
                              <button
                                className="bg-red-600 text-white hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => clearState()}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-gray-600 text-white hover:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={(event) => handleSubmit(event)}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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
                              Sales Order Number
                            </label>
                            <p className="block text-base font-medium">
                              {props.newOrder.order_number}
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
                              {props.newOrder.status}
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-6">
                            <label
                              for="sales_date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Sales Order Date
                            </label>
                            <p className="block text-base font-medium ">
                              {new Date(props.newOrder.created).toDateString}
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
                            <input
                              value={accountName}
                              onChange={handleAccountName}
                              disabled={
                                paymentType === null || paymentType < 2
                                  ? true
                                  : false
                              }
                              type="text"
                              placeholder="Amount Date"
                              name="bank_name"
                              id="bank_name"
                              autocomplete="given-name"
                              className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="mt-4 text-right ">
                          <button
                            className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setContinue(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-gray-600 text-white hover:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(event) => handlePaymentSubmit(event)}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
  getSales: (authToken) => dispatch(salesActions.getSales(authToken)),
  createSalesOrder: (authToken, payload, totalDiscount) =>
    dispatch(
      salesActions.createSalesOrder(
        authToken,
        payload,

        totalDiscount
      )
    ),
  addPaymentMethod: (authToken, payload) =>
    dispatch(salesActions.addPaymentMethod(authToken, payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditModal)
);
