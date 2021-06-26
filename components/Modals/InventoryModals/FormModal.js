import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { useSession } from 'next-auth/client';

const FormModal = (props) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const [codeError, setCodeError] = useState('');
  const [nameError, setNameError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [costError, setCostError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [hasError, setHasError] = useState(false);
  const [session, loading] = useSession();

  const handleCode = (event) => {
    event.preventDefault();
    setCodeError('');
    setCode(event.target.value);
  };
  const handleCost = (event) => {
    event.preventDefault();
    setCostError('');
    setCost(event.target.value);
  };
  const handlePrice = (event) => {
    event.preventDefault();
    setPriceError('');
    setPrice(event.target.value);
  };
  const handleDescription = (event) => {
    event.preventDefault();
    setDescriptionError('');
    setDescription(event.target.value);
  };
  const handleName = (event) => {
    event.preventDefault();
    setNameError('');
    setName(event.target.value);
  };
  const handleType = (event) => {
    event.preventDefault();
    setTypeError('');
    setType(event.target.value);
  };
  const handleQuantity = (event) => {
    event.preventDefault();
    setQuantityError('');
    setQuantity(event.target.value);
  };

  const [firstPhoto, setFirstPhoto] = useState(null);
  const [secondPhoto, setSecondPhoto] = useState(null);
  const [thirdPhoto, setThirdPhoto] = useState(null);
  const onSetFirstPhoto = (event) => {
    var file = event.target.files[0];
    var compressed;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    console.log(file);
    setFirstPhoto(file);
    event.target.value = '';
  };

  const onSetSecondPhoto = (event) => {
    var file = event.target.files[0];
    var compressed;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setSecondPhoto(file);

    event.target.value = '';
  };

  const onSetThirdPhoto = (event) => {
    var file = event.target.files[0];
    var compressed;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    imageCompression(file, options)
      .then(function (compressedFile) {
        console.log(compressedFile, 'compressedFile');
        compressed = compressedFile;

        setThirdPhoto(compressed);
      })
      .catch(function (error) {
        // console.log(error.message);
      });

    event.target.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;
    if (code === '') {
      setCodeError('Please up field');
      error = true;
    }
    if (name === '') {
      setNameError('Please up field');
      error = true;
    }

    if (type === '') {
      setTypeError('Please up field');
      error = true;
    }
    if (price === '') {
      setPriceError('Please up field');
      error = true;
    }
    if (quantity === '') {
      setQuantityError('Please up field');
      error = true;
    }

    if (cost === '') {
      setCostError('Please up field');
      error = true;
    }

    if (description === '') {
      setDescriptionError('Please up field');
      error = true;
    }
    if (error) {
      setHasError(true);
    } else {
      const payload = {
        unit_price: price,
        name: name,
        code: code,
        cost: quantity,
        cost: cost,
        categories: [type],
        description: description,
        images: firstPhoto,
      };

      let form_data = new FormData();
      form_data.append('unit_price', price);
      form_data.append('name', name);
      form_data.append('code', code);
      form_data.append('stock', quantity);
      form_data.append('cost', cost);
      form_data.append('category', type);
      form_data.append('description', description);

      if (firstPhoto) form_data.append('images', firstPhoto);

      if (secondPhoto) form_data.append('images', secondPhoto);

      if (thirdPhoto) form_data.append('images', thirdPhoto);

      props
        .addItem(session.user.auth_token, form_data)
        .then((res) => {
          if (res.status === 200) {
            alert('Item has been successfully added');
            props.getItems(session.user.auth_token);
          } else {
            alert('Failed to add item');
          }
        })
        .catch(({ response }) => {
          alert('Failed to add item');
        });
      props.closeModal();
    }
  };

  return (
    <>
      {props.showModal ? (
        <>
          <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="relative my-6 mx-auto w-full max-w-4xl">
              {/*content*/}
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 class="text-3xl font-semibold">Add New Item</h3>
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
                        <p class="mt-1 text-sm text-gray-600">
                          Input the item information required.
                        </p>
                      </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                      <form onSubmit={handleSubmit}>
                        <div class="shadow overflow-hidden sm:rounded-md bg-">
                          <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item Code
                                </label>
                                <input
                                  type="text"
                                  placeholder="Item Code"
                                  value={code}
                                  onChange={handleCode}
                                  name="item_code"
                                  id="item_code"
                                  autocomplete="given-name"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {codeError ? (
                                  <span className="text-red-500">
                                    {codeError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Item Name"
                                  value={name}
                                  onChange={handleName}
                                  name="item_name"
                                  id="item_name"
                                  autocomplete="given-name"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {nameError ? (
                                  <span className="text-red-500">
                                    {nameError}
                                  </span>
                                ) : null}
                              </div>

                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_type"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Item Type/Brand
                                </label>
                                <select
                                  onChange={handleType}
                                  id="item_type"
                                  placeholder="Item Type/Brand"
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
                                    Item Type/Brand
                                  </option>
                                  {props.categories.map((categories) => (
                                    <option
                                      key={categories.id}
                                      value={categories.id}
                                    >
                                      {categories.name}
                                    </option>
                                  ))}
                                </select>
                                {typeError ? (
                                  <span className="text-red-500">
                                    {typeError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="price"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Price {'(₱)'}
                                </label>
                                <input
                                  type="number"
                                  value={price}
                                  onChange={handlePrice}
                                  placeholder="Price (₱)"
                                  name="price"
                                  id="price"
                                  autocomplete="price"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {priceError ? (
                                  <span className="text-red-500">
                                    {priceError}
                                  </span>
                                ) : null}
                              </div>

                              {session.user.user.is_superuser ? (
                                <div class="col-span-6 sm:col-span-3">
                                  <label
                                    for="price"
                                    class="block text-sm font-medium text-gray-700"
                                  >
                                    Cost {'(₱)'}
                                  </label>
                                  <input
                                    type="number"
                                    value={cost}
                                    onChange={handleCost}
                                    placeholder="Cost (₱)"
                                    name="cost"
                                    id="cost"
                                    autocomplete="cost"
                                    class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                  />
                                  {costError ? (
                                    <span className="text-red-500">
                                      {costError}
                                    </span>
                                  ) : null}
                                </div>
                              ) : null}

                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="quantity"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  value={quantity}
                                  onChange={handleQuantity}
                                  placeholder="Quantity"
                                  name="quantity"
                                  id="quantity"
                                  autocomplete="given-name"
                                  class="mt-1 px-2 py-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {quantityError ? (
                                  <span className="text-red-500">
                                    {quantityError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6">
                                <label
                                  for="description"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Description
                                </label>

                                <input
                                  type="text"
                                  placeholder="Description"
                                  value={description}
                                  onChange={handleDescription}
                                  name="description"
                                  id="description"
                                  // autocomplete="given-name"
                                  class="mt-1 px-2 py-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {descriptionError ? (
                                  <span className="text-red-500">
                                    {descriptionError}
                                  </span>
                                ) : null}
                              </div>
                              <label class="block text-sm font-medium text-gray-700">
                                Item photo/s
                              </label>
                              <div class="col-span-6 ">
                                <div class="flex h-48 max-h-48 ">
                                  {firstPhoto ? (
                                    <div className="mr-2 w-48 flex flex-col flex-1 h-48 max-h-48 ">
                                      <span
                                        onClick={() => {
                                          setFirstPhoto(null);
                                        }}
                                        className="cursor-pointer self-end bg-transparent text-black text-2xl block outline-none focus:outline-none"
                                      >
                                        x
                                      </span>

                                      <img
                                        className="h-full overflow-hidden object-contain"
                                        src={URL.createObjectURL(firstPhoto)}
                                      />
                                    </div>
                                  ) : (
                                    <div class="mr-2 h-full flex flex-1 justify-center align-center items-center flex-col border-2 border-gray-300 border-dashed rounded-md">
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
                                          for="file-upload-1"
                                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file </span>
                                          <input
                                            id="file-upload-1"
                                            name="file-upload-1"
                                            type="file"
                                            class="sr-only"
                                            accept="image/*"
                                            class="sr-only"
                                            onChange={onSetFirstPhoto}
                                          />
                                        </label>
                                        <p class="pl-1"> or drag and drop</p>
                                      </div>
                                      <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  )}
                                  <>
                                    {secondPhoto ? (
                                      <div className="flex flex-col flex-1 h-48 max-h-48 ">
                                        <span
                                          onClick={() => {
                                            setSecondPhoto(null);
                                          }}
                                          className="cursor-pointer self-end bg-transparent text-black text-2xl block outline-none focus:outline-none"
                                        >
                                          x
                                        </span>

                                        <img
                                          className="h-full overflow-hidden object-contain"
                                          src={URL.createObjectURL(secondPhoto)}
                                        />
                                      </div>
                                    ) : (
                                      <div class=" flex flex-1 justify-center align-center items-center flex-col border-2 border-gray-300 border-dashed rounded-md">
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
                                          {firstPhoto ? (
                                            <>
                                              <div class="flex text-sm text-gray-600">
                                                <label
                                                  for="file-upload-2"
                                                  class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                  <span>Upload a file </span>
                                                  <input
                                                    id="file-upload-2"
                                                    name="file-upload-2"
                                                    type="file"
                                                    accept="image/*"
                                                    class="sr-only"
                                                    onChange={onSetSecondPhoto}
                                                  />
                                                </label>
                                                <p class="pl-1">
                                                  or drag and drop
                                                </p>
                                              </div>
                                              <p class="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                              </p>
                                            </>
                                          ) : (
                                            <p class="text-xs text-gray-500">
                                              Please add first photo
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                  {thirdPhoto ? (
                                    <div className="ml-2 flex flex-col flex-1 h-48 max-h-48 ">
                                      <span
                                        onClick={() => {
                                          setThirdPhoto(null);
                                        }}
                                        className="cursor-pointer self-end bg-transparent text-black text-2xl block outline-none focus:outline-none"
                                      >
                                        x
                                      </span>

                                      <img
                                        className="h-full overflow-hidden object-contain"
                                        src={URL.createObjectURL(thirdPhoto)}
                                      />
                                    </div>
                                  ) : (
                                    <div class="ml-2 flex flex-1 justify-center align-center items-center flex-col border-2 border-gray-300 border-dashed rounded-md">
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
                                        {firstPhoto && secondPhoto ? (
                                          <>
                                            <div class="flex text-sm text-gray-600">
                                              <label
                                                for="file-upload-2"
                                                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                              >
                                                <span>Upload a file </span>
                                                <input
                                                  id="file-upload-2"
                                                  name="file-upload-2"
                                                  type="file"
                                                  accept="image/*"
                                                  class="sr-only"
                                                  onChange={onSetThirdPhoto}
                                                />
                                              </label>
                                              <p class="pl-1">
                                                or drag and drop
                                              </p>
                                            </div>
                                            <p class="text-xs text-gray-500">
                                              PNG, JPG, GIF up to 10MB
                                            </p>
                                          </>
                                        ) : (
                                          <p class="text-xs text-gray-500">
                                            Please add succeeding photos first
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="px-4 py-3 text-right sm:px-6">
                            <button
                              className="bg-red-600 text-white hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => props.closeModal()}
                            >
                              Cancel
                            </button>
                            <input
                              className="bg-gray-600 text-white hover:bg-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                              value="Save"
                            />
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

export default FormModal;
