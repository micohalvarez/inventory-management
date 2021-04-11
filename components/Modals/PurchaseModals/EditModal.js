import React, { useState } from 'react';

const EditModal = (props) => {
  const [newItems, setNewitems] = useState([
    <>
      <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
        <td className="border-t-0 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
          <select
            id="item_type"
            placeholder="Item Type/Category"
            name="item_type"
            autocomplete="item_type"
            class="px-2 mt-1 w-64 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option class="text-color-gray-300" value="" disabled hidden>
              Item Code
            </option>
            <option selected>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
          </select>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <input
            type="text"
            value="50"
            placeholder="Quantity"
            name="quantity"
            id="quantity"
            autocomplete="quantity"
            class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-half shadow-sm sm:text-sm border border-gray-300 rounded-md"
          />
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <span> ₱400 PHP</span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <select
            id="item_type"
            placeholder="Item Type/Category"
            name="item_type"
            autocomplete="item_type"
            class="px-2 mt-1 w-32 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option class="text-color-gray-300" value="" disabled hidden>
              No Discount
            </option>
            <option selected>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
          </select>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <span> ₱5,000 PHP</span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <i className="fas fa-trash-alt mr-2 text-red-500 hover:text-red-600 cursor-pointer"></i>
        </td>
      </tr>
      <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
        <td className="border-t-0 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
          <select
            id="item_type"
            placeholder="Item Type/Category"
            name="item_type"
            autocomplete="item_type"
            class="px-2 mt-1 w-64 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option class="text-color-gray-300" value="" disabled hidden>
              Item Code
            </option>
            <option selected>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
          </select>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            id="quantity"
            value="50"
            autocomplete="quantity"
            class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-half shadow-sm sm:text-sm border border-gray-300 rounded-md"
          />
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <span> ₱400 PHP</span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <select
            id="item_type"
            placeholder="Item Type/Category"
            name="item_type"
            autocomplete="item_type"
            class="px-2 mt-1 w-32 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option class="text-color-gray-300" value="" disabled hidden>
              No Discount
            </option>
            <option selected>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
          </select>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <span> ₱5,000 PHP</span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          <i className="fas fa-trash-alt mr-2 text-red-500 hover:text-red-600 cursor-pointer"></i>
        </td>
      </tr>
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
          ₱5,000 PHP
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          No Discount
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          ₱5,000 PHP
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
          ₱5,000 PHP
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          No Discount
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
          ₱5,000 PHP
        </td>
      </tr>
    </>,
  ]);
  const addNewItem = () => {
    newItems.splice(
      0,
      0,
      <>
        <tr className="mt-1 justify-center align-center text-gray-800 border-gray-200 ">
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
            <select
              id="item_type"
              placeholder="Item Type/Category"
              name="item_type"
              autocomplete="item_type"
              class="px-2 mt-1 w-64 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option
                class="text-color-gray-300"
                value=""
                disabled
                hidden
                selected
              >
                Item Code
              </option>
              <option>Type 1</option>
              <option>Type 2</option>
              <option>Type 3</option>
            </select>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
            <input
              type="text"
              placeholder="Quantity"
              name="price"
              id="price"
              autocomplete="price"
              class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-half shadow-sm sm:text-sm border border-gray-300 rounded-md"
            />
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
            <span> ₱400 PHP</span>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
            <select
              id="item_type"
              placeholder="Item Type/Category"
              name="item_type"
              autocomplete="item_type"
              class="px-2 mt-1 w-32 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option
                class="text-color-gray-300"
                value=""
                disabled
                hidden
                selected
              >
                No Discount
              </option>
              <option>Type 1</option>
              <option>Type 2</option>
              <option>Type 3</option>
            </select>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
            <span> ₱5,000 PHP</span>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
            <i className="fas fa-trash-alt mr-2 text-red-500 hover:text-red-600 cursor-pointer"></i>
          </td>
        </tr>
      </>
    );
    setNewitems([...newItems]);
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
                      ? 'Purchase Order Summary'
                      : 'Create Purchase Order'}
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
                {!isContinue ? (
                  <div className="p-6 flex-auto mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Purchase Information
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Input the purchase information required.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div className="shadow overflow-hidden sm:rounded-md bg-">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-8 sm:col-span-3">
                                  <label
                                    for="purchase_number"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Purchase Order Number
                                  </label>
                                  <input
                                    type="text"
                                    value="00001"
                                    placeholder="Purchase Order Number"
                                    name="purchase_number"
                                    id="purchase_number"
                                    autocomplete="given-name"
                                    className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="Supplier_name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Supplier Name
                                  </label>
                                  <input
                                    type="text"
                                    value="Supplier 5"
                                    placeholder="Supplier Name"
                                    name="supplier_name"
                                    id="supplier_name"
                                    autocomplete="given-name"
                                    className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="purchase_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Purchase Order Date
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Purchase Order Date"
                                    value="03/01/2021"
                                    name="purchase_date"
                                    id="purchase_date"
                                    autocomplete="given-name"
                                    className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="shipment_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Shipment Date
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Shipment Date"
                                    name="shipment_date"
                                    value="03/05/2021"
                                    id="shipment_date"
                                    autocomplete="given-name"
                                    className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="payment_type"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Payment Type
                                  </label>
                                  <select
                                    id="item_type"
                                    name="item_type"
                                    autocomplete="item_type"
                                    class="text-color-gray-300 mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    <option
                                      class="text-color-gray-300"
                                      value=""
                                      disabled
                                      hidden
                                    >
                                      Payment Type
                                    </option>
                                    <option selected>Cash</option>
                                    <option>Card</option>
                                    <option>Cheque</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="p-6 h-2/5 overflow-y-auto">
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
                                      Discount
                                    </th>
                                    <th
                                      className={
                                        'px-6 align-middle border border-l-0 border-r-0 border-solid py-3 text-sm uppercase whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Total Amount
                                    </th>
                                    <th
                                      className={
                                        'px-6 align-middle border border-l-0  border-solid py-3 text-sm uppercase whitespace-no-wrap font-semibold text-left'
                                      }
                                    ></th>
                                  </tr>
                                </thead>
                                <tbody>{newItems}</tbody>
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
                                onClick={() => setContinue(true)}
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
                              for="purchase_number"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Purchase Order Number
                            </label>
                            <p className="block text-base font-medium">
                              #00001
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              for="Supplier_name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Supplier Name
                            </label>
                            <p className="block text-base font-medium">
                              Supplier
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              for="purchase_date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Purchase Order Date
                            </label>
                            <p className="block text-base font-medium ">
                              03/10/2021
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              for="shipment_date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Shipment Date
                            </label>
                            <p className="block text-base font-medium ">
                              03/15/2021
                            </p>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              for="payment_type"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Payment Type
                            </label>
                            <p className="block text-base font-medium ">Cash</p>
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
                                  Purchase Order Number
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
                          </table>
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
                            onClick={() => props.closemodal()}
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

export default EditModal;
