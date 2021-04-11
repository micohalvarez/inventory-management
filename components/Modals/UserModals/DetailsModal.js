import React from 'react';

const DetailsModal = (props) => {
  return (
    <>
      {props.showModal ? (
        <>
          <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 class="text-3xl font-semibold">Item Details</h3>
                  <button
                    class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.closeModal()}
                  >
                    <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div class="p-6 flex-auto mt-10 sm:mt-0">
                  <div class="md:grid md:grid-cols-2 md:gap-6">
                    <div class="md:col-span-1">
                      <div class="px-4 sm:px-0">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                          Item Information
                        </h3>
                      </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                      <form action="#" method="POST">
                        <div class="shadow overflow-hidden sm:rounded-md bg-">
                          <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                              <div class="col-span-6">
                                <div class="flex">
                                  <div class="mt-1 mr-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div class="space-y-1 text-center">
                                      <svg
                                        class="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                      <div class="flex text-sm text-gray-600">
                                        <label
                                          for="file-upload"
                                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file </span>
                                          <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            class="sr-only"
                                          />
                                        </label>
                                        <p class="pl-1"> or drag and drop</p>
                                      </div>
                                      <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </div>
                                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div class="space-y-1 text-center">
                                      <svg
                                        class="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                      <div class="flex text-sm text-gray-600">
                                        <label
                                          for="file-upload"
                                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file </span>
                                          <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            class="sr-only"
                                          />
                                        </label>
                                        <p class="pl-1"> or drag and drop</p>
                                      </div>
                                      <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </div>
                                  <div class="mt-1 ml-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div class="space-y-1 text-center">
                                      <svg
                                        class="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                      <div class="flex text-sm text-gray-600">
                                        <label
                                          for="file-upload"
                                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file </span>
                                          <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            class="sr-only"
                                          />
                                        </label>
                                        <p class="pl-1"> or drag and drop</p>
                                      </div>
                                      <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item Code
                                </label>
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  00001
                                </label>
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item Name
                                </label>
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item 1
                                </label>
                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_type"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item Type/Category
                                </label>
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Type 1
                                </label>
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="price"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Price {'(₱)'}
                                </label>
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  ₱1,500 PHP
                                </label>
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="quantity"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Quantity
                                </label>
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  <i className="fas fa-circle text-red-500 mr-2"></i>
                                  50
                                </label>
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="supplier_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Supplier Name
                                </label>
                                <label
                                  for="supplier_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Supplier 1
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="px-4 py-3 text-right sm:px-6">
                            <button
                              className="bg-red-600 text-white hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => props.closeModal()}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </form>
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

export default DetailsModal;
