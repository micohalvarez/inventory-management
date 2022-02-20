import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as salesActions from '../../../redux/actions/salesActions';

import { useSession } from 'next-auth/client';
import SuccessModal from '../SuccessModal';
import Select from 'react-dropdown-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
const FormModal = (props) => {

  const [session, loading] = useSession();

  const [modalError, setModalError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [successModal, setSuccessModal] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [note,setNote]= useState('')
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const [customerNameError, setCustomerNameError] = useState('');
  const [noteError, setNoteError] = useState('');
  const [nameError, setNameError] = useState('');
  const [typeError, setTypeError] = useState('');

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentDateError, setPaymentDateError] = useState(null);

  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchaseDateError, setPurchaseDateError] = useState(null);
  
  const [items, setItems] = useState([
    {
      type: null,
      product: null,
      price: 0,
      quantity: 1,
      box_amount: 0,
      less_amount: 0,
      add_amount: 0,
      item_discount:0,
      total:0,
      isOverride: false,
    },
  ]);

  const [submitItems, setSubmitItems] = useState([
    { product: null, quantity: 1, box_amount: 0,less_amount : 0 ,item_discount:0, add_amount: 0}
  ]);

  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBoxAmount, setTotalBoxAmount] = useState(0);
  const [totalLessAmount, setTotalLessAmount] = useState(0);
  const [totalAddAmount, setTotalAddAmount] = useState(0);
  const [quantity, setQuantity] = useState([0]);

  const [boxError, setBoxError] = useState('');
  const [choices, setChoices] = useState(props.items);
  const [isContinue, setContinue] = useState(false);

  const [newItems, setNewitems] = useState([]);

  useEffect(() => {
    if (newItems.length === 0 && props.items.length > 0) {
      newItems.splice(
        0,
        0,
        <>
          <tr
            onClick={() => addNewItem()}
            className="hover:bg-green-500 hover:text-white cursor-pointer  bg-gray-200 justify-center align-center text-gray-800 border-gray-200 "
          >
            <td colSpan="6" align="center" className="py-3">
              <span className="ml-3  font-bold align-center text-center">
                <i className="fas fa-plus mr-2"></i> Add Item
              </span>
            </td>
          </tr>
        </>
      );
      setNewitems([...newItems]);
    }
    if (props.selectedId) {
      addType();
    }
  }, [props.items, newItems, props.selectedId]);



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
      box_amount: 0,
      less_amount : 0,
      add_amount: 0,
      item_discount: 0,
      total:0
    });
    subItems.push({ product: null, quantity: 1, box_amount: 0,less_amount:0,    add_amount: 0,item_discount: 0, });


    
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
    console.log(totalAmount)
    console.log(totalBoxAmount)
    console.log(totalLessAmount )
    console.log(   parseFloat(
      (totalAmount) *
        (totalDiscount / 100)
    ))
    console.log(numberWithCommas(
      parseFloat(
        (totalAmount ) *
          (totalDiscount / 100)
      ).toFixed(2)))
  };

  const handleCustomerName = (event) => {
    event.preventDefault();
    setCustomerNameError('');
    setCustomerName(event.target.value);
  };

  const handleNote = (event) => {
    event.preventDefault();
    setNoteError('');
    setNote(event.target.value);
  };

  const handleQuantity = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];
    
    if (!(event.target.value > 10000 || event.target.value < 0)) {
      testItems[index].quantity = event.target.value;

      subItems[index].quantity = event.target.value;
      testItems[index].total = ((event.target.value * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) - ((event.target.value * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price) ) * (testItems[index].item_discount ? parseFloat(testItems[index].item_discount) / 100 : 0))) + ((testItems[index].box_amount ? parseFloat(testItems[index].box_amount) : 0) - (testItems[index].less_amount ? parseFloat(testItems[index].less_amount) : 0)) + (testItems[index].add_amount ? parseFloat(testItems[index].add_amount) : 0)

      handleTotalAmount();
      setSubmitItems(subItems);
      setItems(testItems);
    }
  };

  const handleBoxAmount = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];
    if (!(event.target.value > 10000 || event.target.value < 0)) {

      testItems[index].box_amount = event.target.value;

      subItems[index].box_amount = event.target.value;
      testItems[index].total = ( (testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) - (testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) * (testItems[index].item_discount ? parseFloat(testItems[index].item_discount) / 100 : 0)) +  ((event.target.value ? parseFloat(event.target.value) : 0)  - (testItems[index].less_amount ? parseFloat(testItems[index].less_amount) : 0)) + (testItems[index].add_amount ? parseFloat(testItems[index].add_amount) : 0)

      handleTotalAmount();
      setSubmitItems(subItems);
      setItems(testItems);
    }
  };

  const handleLessAmount = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];
    if (!(event.target.value > 10000 || event.target.value < 0)) {

      testItems[index].less_amount = event.target.value;

      subItems[index].less_amount = event.target.value;
      testItems[index].total = ( (testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) - (testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) * (testItems[index].item_discount ? parseFloat(testItems[index].item_discount) / 100 : 0)) + ((testItems[index].box_amount ? parseFloat(testItems[index].box_amount) : 0) -  (event.target.value ? parseFloat(event.target.value) : 0)) + (testItems[index].add_amount ? parseFloat(testItems[index].add_amount) : 0)

      handleTotalAmount();
      setSubmitItems(subItems);
      setItems(testItems);
    }
  };

  const handleAddAmount = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];
    if (!(event.target.value > 10000 || event.target.value < 0)) {

      testItems[index].add_amount = event.target.value;

      subItems[index].add_amount = event.target.value;
      testItems[index].total = ( (testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) - (testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) * (testItems[index].item_discount ? parseFloat(testItems[index].item_discount) / 100 : 0)) + ((testItems[index].box_amount ? parseFloat(testItems[index].box_amount) : 0) -  (testItems[index].less_amount ? parseFloat(testItems[index].less_amount) : 0)) + (event.target.value ? parseFloat(event.target.value) : 0)

      handleTotalAmount();
      setSubmitItems(subItems);
      setItems(testItems);
    }
  };

  const handleItemDiscount = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];
    if (!(event.target.value > 100 || event.target.value < 0)) {

      testItems[index].item_discount = event.target.value ;
      
      subItems[index].item_discount = event.target.value / 100;
      testItems[index].total = ((testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) - ((testItems[index].quantity * (testItems[index].unit_price ? testItems[index].unit_price : testItems[index].price)) * (event.target.value ? parseFloat(event.target.value) / 100 : 0))) + ((testItems[index].box_amount ? parseFloat(testItems[index].box_amount) : 0) -  (testItems[index].less_amount ? parseFloat(testItems[index].less_amount) : 0)) + (testItems[index].add_amount ? parseFloat(testItems[index].add_amount) : 0)

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
    let totalBox = 0
    let totalLess = 0;
    let totalAdd = 0
    items.map((item) => {

      totalAmount += (((item.unit_price ? item.unit_price : item.price) * item.quantity) - (((item.unit_price ? item.unit_price : item.price) * item.quantity) * (item.item_discount || item.item_discount !== 0 ? parseFloat(item.item_discount / 100) : 0))) + (item.box_amount ? parseFloat(item.box_amount) : 0) - (item.less_amount ? parseFloat(item.less_amount) : 0) + (item.add_amount ? parseFloat(item.add_amount) : 0)

      totalBox += (item.box_amount ? parseFloat(item.box_amount) : 0)
      totalLess += (item.less_amount ? parseFloat(item.less_amount) : 0)
      totalAdd += (item.add_amount ? parseFloat(item.add_amount) : 0)
    });

    setTotalAmount(totalAmount);
    setTotalBoxAmount(totalBox);
    setTotalLessAmount(totalLess);
    setTotalAddAmount(totalAdd)
  };

  const handlePrice = (event, index) => {
    event.preventDefault();
    let testItems = [...items];
    let subItems = [...submitItems];
    if (!(event.target.value < 0)) {
      testItems[index].unit_price = event.target.value;

      subItems[index].unit_price = event.target.value;
      testItems[index].total = ((testItems[index].quantity * event.target.value) - ((testItems[index].quantity * event.target.value ) * (testItems[index].item_discount ? parseFloat(testItems[index].item_discount) / 100 : 0))) + ((testItems[index].box_amount ? parseFloat(testItems[index].box_amount) : 0) - (testItems[index].less_amount ? parseFloat(testItems[index].less_amount) : 0)) + (testItems[index].add_amount ? parseFloat(testItems[index].add_amount) : 0)
      handleTotalAmount();
      setSubmitItems(subItems);
      setItems(testItems);
    }
  };

  const handleType = (index, item) => {
    let testItems = [...items];
    let subItems = [...submitItems];
    console.log(items)

    if (item != null) {
      testItems[index].price = item.unit_price;
      testItems[index].type = item.id;
      testItems[index].item_discount = 0;
      testItems[index].box_amount = 0;
      testItems[index].quantity = 1;
      testItems[index].unit_price = null;
      testItems[index].less_amount = 0;
      testItems[index].add_amount = 0;
      testItems[index].images = item.images;
      testItems[index].isOverride = false;
      subItems[index].product = item.id;
      testItems[index].total = item.unit_price;
    } else {
      testItems[index].price = 0;
      testItems[index].type = null;
      testItems[index].quantity = 1;
      testItems[index].total = 0;
      testItems[index].total_discount = 0;
      testItems[index].isOverride = false;
      delete testItems[index].images;
      subItems[index].product = null;
    }

  

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
    console.log(submitItems)
    var hasError = false;

    submitItems.map((item) => {
  
      if (item.quantity <= 0 || isNaN(item.quantity)) {
        hasError = true;
        setModalMessage('Quantities must be numeric and greater than 0.');
      }
      if (item.product === null) {
        hasError = true;
        setModalMessage('Order Form has empty rows.');
      }

      if (item.box_amount < 0 || isNaN(item.box_amount)) {
        hasError = true;
        setModalMessage('Box Prices must be numeric and greater than 0.');
      }

      if (item.less_amount < 0 || isNaN(item.less_amount)) {
        hasError = true;
        setModalMessage('Less Amount must be numeric and greater than 0.');
      }

      if (item.add_amount < 0 || isNaN(item.add_amount)) {
        hasError = true;
        setModalMessage('Add Amount must be numeric and greater than 0.');
      }

      if(item.box_amount === ""){
        item.box_amount = 0
      }

      if(item.less_amount === ""){
        item.less_amount = 0
      }

      if(item.add_amount === ""){
        item.add_amount = 0
      }
      
      if(item.item_discount === ""){
        item.item_discount = 1
      }

      if (item.unit_price === "") {
        hasError = true;
        setModalMessage('Each item must have price.');
      }

      if (!customerName) {
        hasError = true;
        setModalMessage('Customer Name is required.');
      }
    });

    console.log(submitItems)

    if (hasError) {
      setModalError(true);
      setSuccessModal(true);
      return false;
    } else {
      props
        .createSalesOrder(
          session.user.auth_token,
          submitItems,
          totalDiscount,
          customerName,
          note,
          moment(purchaseDate).format('YYYY-MM-DD'),
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
          console.log(error.response,'hii')
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
    setItems([
      { type: null, product: null, price: 0, quantity: 1, isOverride: false, box_amount:0,item_discount:0, less_amount:0,add_amount:0, total:0 },
    ]);
    setTotalAmount(0);
    setCustomerName('')
    setNote('')
    setPurchaseDate(new Date())
    setTotalDiscount(0);
    setTotalDiscountAmount(0);
    setSuccessModal(false);
    setSubmitItems([{ product: null, quantity: 0 ,box_amount:0, less_amount:0,add_amount:0, item_discount:0}]);
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
                      ×
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
                            <div class="grid grid-cols-6 gap-6 p-6">
                              {/* <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="item_code"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                 Sales Order
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
                              </div> */}
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="customer_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Customer Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Customer Name"
                                  value={customerName}
                                  onChange={handleCustomerName}
                                  name="customer_name"
                                  id="customer_name"
                                  autocomplete="customer-name"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-5/12 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {customerNameError ? (
                                  <span className="text-red-500">
                                    {customerNameError}
                                  </span>
                                ) : null}
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label
                                  for="customer_name"
                                  class="block text-sm font-medium text-gray-700"
                                >
                                  Note/Remark(Optional)
                                </label>
                                <input
                                  type="text"
                                  placeholder="Note/Remark"
                                  value={note}
                                  onChange={handleNote}
                                  name="note"
                                  id="note"
                                  autocomplete="note"
                                  class="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-5/12 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                />
                                {noteError ? (
                                  <span className="text-red-500">
                                    {noteError}
                                  </span>
                                ) : null}
                              </div>
                          <div className="col-span-6 sm:col-span-3 flex flex-col">
                            <label
                              for="sales_date"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Date of Purchase
                            </label>
                            <DatePicker
                      
                              className="mt-1 py-2 px-2 w-full focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                              selected={purchaseDate}
                              onChange={(date) => {
                                setPurchaseDateError(null);
                                setPurchaseDate(date);
                              }}
                            />
                            {purchaseDateError ? (
                              <span className="text-red-500">{purchaseDateError}</span>
                            ) : null}
                          </div>
                            </div>
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
                                        'px-2 align-middle border-l-0 border-r-0  border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left '
                                      }
                                    >
                                      Item Price
                                    </th>

                                    <th
                                      className={
                                        'px-6 align-middle border-l-0 border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Item Discount (%)
                                    </th>


                                    <th
                                      className={
                                        'px-4 align-middle border-l-0 border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Box Price
                                    </th>

                                    <th
                                      className={
                                        'px-4 align-middle border-l-0 border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Less Amount
                                    </th>
                                    <th
                                      className={
                                        'px-4 align-middle border-l-0 border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Add Amount
                                    </th>
                              
                            
                                    <th
                                      className={
                                        'px-4 align-middle border-l-0 border-r-0 border border-solid py-3 text-sm uppercase  whitespace-no-wrap font-semibold text-left'
                                      }
                                    >
                                      Item Total
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
                                        <td className="py-6 p-4 border-t-0 align-middle border-l-0 border-r-0  flex flex-row ">
                                          {item.type === null ? (
                                            <div className="h-8 w-8  bg-white rounded-full border justify-center flex">
                                              <img
                                                src={'/img/sketch.jpg'}
                                                className="h-full overflow-hidden bg-white rounded-full  object-fit"
                                                alt="..."
                                              ></img>
                                            </div>
                                          ) : (
                                            <div className="h-8 w-8  bg-white rounded-full border justify-center flex">
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
                                          )}

                                          <div className="bg-white flex-1">
                                            <Select
                                              options={props.allItems}
                                              labelField={'name'}
                                              valueField={'id'}
                                              searchBy={'code'}
                                              className="ml-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-half shadow-sm sm:text-sm border border-gray-300 rounded-md "
                                              clearOnSelect={true}
                                              onChange={(value) => {
                                                if (value.length !== 0)
                                                  handleType(index, value[0]);
                                                else {
                                                  handleType(index, null);
                                                }
                                              }}
                                            />
                                          </div>
                                        </td>
                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
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
                                            className={`mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-5/12 shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                                              item.type === null
                                                ? 'opacity-60 cursor-not-allowed'
                                                : null
                                            }`}
                                          />
                                        </td>
                    
                                        {true ? (
                                          <td className="border-t-0 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap relative items-stretch">
                                            {item.type === null ? null : (
                                              <span
                                                onClick={() =>
                                                  (item.isOverride =
                                                    !item.isOverride)
                                                }
                                                className={`z-10 h-full  cursor-pointer leading-snug font-normal absolute right-0 pr-2 py-3 ${
                                                  !item.isOverride
                                                    ? 'text-gray-600 hover:text-gray-800'
                                                    : 'text-gray-800 hover:text-gray-600'
                                                }`}
                                              >
                                                <i className="fas fa-edit"></i>
                                              </span>
                                            )}

                                            <input
                                              type="number"
                                              name="price"
                                              disabled={
                                                item.isOverride ? false : true
                                              }
                                              value={
                                                item.isOverride
                                                  ? item.unit_price || item.unit_price === 0 || item.unit_price === ""
                                                    ? item.unit_price
                                                    : item.price
                                                  : item.price
                                              }
                                              onChange={(event) =>
                                                handlePrice(event, index)
                                              }
                                              id="price"
                                              class={`mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                                                item.type == null ||
                                                !item.isOverride
                                                  ? 'opacity-80 cursor-not-allowed'
                                                  : null
                                              }`}
                                            />
                                          </td>
                                        ) : (
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                            <span>
                                              {numberWithCommas(item.price)}
                                            </span>
                                          </td>
                                        )}

                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                          <input
                                            type="number"
                                            disabled={
                                              item.type === null ? true : false
                                            }
                                            value={item.item_discount}
                                            onChange={(event) =>
                                              handleItemDiscount(event, index)
                                            }
                                            placeholder="Item Discount"
                                            name="item_discount"
                                            id="item_discount"
                                            autocomplete="item_discount"
                                            className={`mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-7/12 shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                                              item.type === null
                                                ? 'opacity-60 cursor-not-allowed'
                                                : null
                                            }`}
                                          />
                                        </td>

                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
                                          <input
                                            type="number"
                                            disabled={
                                              item.type === null ? true : false
                                            }
                                            value={item.box_amount}
                                            onChange={(event) =>
                                              handleBoxAmount(event, index)
                                            }
                                            placeholder="Box Price"
                                            name="box_amount"
                                            id="box_amount"
                                            autocomplete="box_amount"
                                            className={`mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-7/12 shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                                              item.type === null
                                                ? 'opacity-60 cursor-not-allowed'
                                                : null
                                            }`}
                                          />
                                        </td>

                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
                                          <input
                                            type="number"
                                            disabled={
                                              item.type === null ? true : false
                                            }
                                            value={item.less_amount}
                                            onChange={(event) =>
                                              handleLessAmount(event, index)
                                            }
                                            placeholder="Less Amount"
                                            name="less_amount"
                                            id="less_amount"
                                            autocomplete="less_amount"
                                            className={`mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-7/12 shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                                              item.type === null
                                                ? 'opacity-60 cursor-not-allowed'
                                                : null
                                            }`}
                                          />
                                        </td>

                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
                                          <input
                                            type="number"
                                            disabled={
                                              item.type === null ? true : false
                                            }
                                            value={item.add_amount}
                                            onChange={(event) =>
                                              handleAddAmount(event, index)
                                            }
                                            placeholder="Add Amount"
                                            name="add_amount"
                                            id="add_amount"
                                            autocomplete="add_amount"
                                            className={`mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-400 focus:border-blue-400 block w-7/12 shadow-sm sm:text-sm border border-gray-300 rounded-md ${
                                              item.type === null
                                                ? 'opacity-60 cursor-not-allowed'
                                                : null
                                            }`}
                                          />
                                        </td>

                                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap ">
                                        <span>{item.total}</span>
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
                                      <span>Order Discount (%)</span>
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
                                      <span>Order Discount</span>
                                    </th>
                                    <td
                                      className={
                                        ' px-6 py-3 text-sm uppercase border-0 border-r-0 whitespace-no-wrap font-semibold  text-black border-gray-200'
                                      }
                                    >
                                      <span>{`₱ ${
                                        totalDiscount > 0
                                          ? numberWithCommas(
                                              parseFloat(
                                                (totalAmount - (totalBoxAmount - totalLessAmount + totalAddAmount) ) *
                                                  (totalDiscount / 100)
                                              ).toFixed(2)
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
                                    <span>{`₱ ${numberWithCommas(
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
                                    <span>{`₱ ${
                                    
                                      totalDiscount
                                        ?   numberWithCommas(parseFloat(totalAmount -
                                          (totalAmount - (totalBoxAmount - totalLessAmount + totalAddAmount) ) *
                                          (totalDiscount / 100)).toFixed(2))
                                        : numberWithCommas(parseFloat(totalAmount).toFixed(2))
                                    } PHP`}</span>
                                  </td>
                                </tfoot>
                              </table>
                            </div>

                            <div className="px-4 py-3 text-right sm:px-6 ">
                              <button
                                className="bg-green-600 self-start text-white hover:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => addNewItem()}
                              >
                                Add Row
                              </button>
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
  allItems: state.inventory.allItems,
  newOrder: state.sales.newOrder,
});

const mapDispatchToProps = (dispatch) => ({
  getSales: (authToken) => dispatch(salesActions.getSales(authToken)),
  createSalesOrder: (authToken, payload, totalDiscount, customerName,note,purchaseDate) =>
    dispatch(
      salesActions.createSalesOrder(
        authToken,
        payload,
        totalDiscount,
        customerName,
        note,purchaseDate
      )
    ),
  addPaymentMethod: (authToken, payload) =>
    dispatch(salesActions.addPaymentMethod(authToken, payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormModal)
);
