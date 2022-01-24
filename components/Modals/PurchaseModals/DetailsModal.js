import React, { useState } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as salesActions from '../../../redux/actions/salesActions';
import * as orderActions from '../../../redux/actions/orderActions';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ConfirmModal from '../ConfirmModal';
import { useSession } from 'next-auth/client';
import SuccessModal from '../SuccessModal';
const DetailsModal = (props) => {
  
  const [isVisible, setVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);

  const [successModal, setSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [modalError, setModalError] = useState(false);

  const [session, loading] = useSession();
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
  const [editPayment, setEditPayment] = useState(false);
  const [editOrder, setEditOrder] = useState(false);

  const [editPaymentDate, setEditPaymentDate] = useState(null);

  const [editPurchaseDate, setEditPurchaseDate] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [note, setNote] = useState(null);

  const [customerNameError,setCustomerNameError] = useState('')
  const [noteError,setNoteError] = useState('')

  const [paymentType, setPaymentType] = useState(null);
  const [paymentTypeError, setPaymentTypeError] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [bankNameError, setBankNameError] = useState(null);
  const [accountNum, setAccountNum] = useState(null);
  const [accountNumError, setAccountNumError] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentDateError, setPaymentDateError] = useState(null);

  const handlePaymentType = (event) => {
    event.preventDefault();
    setPaymentTypeError('');
    setBankNameError('');
    setAccountNumError('');
    setPaymentType(event.target.value);
  };
  const handleAccountNum = (event) => {
    event.preventDefault();
    setAccountNumError('');
    setAccountNum(event.target.value);
  };
  const handleAccountName = (event) => {
    event.preventDefault();
    setAccountName(event.target.value);
  };
  const handleBankName = (event) => {
    event.preventDefault();
    setBankNameError('');
    setBankName(event.target.value);
  };

  const handleNote = (event) => {
    event.preventDefault();
    setNoteError('');
    setNote(event.target.value);
  };
  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    let error = false;
    if (paymentType === null) {
      setPaymentTypeError('Please up field');
      error = true;
    } else if (paymentType !== null && paymentType >= 2) {
      if (bankName === null || bankName === '') {
        setBankNameError('Please up field');
        error = true;
      }

      if (accountNum === null || accountNum === '') {
        setAccountNumError('Please up field');
        error = true;
      }
      if (
        !moment(paymentDate).isValid() ||
        paymentDate === null ||
        paymentDate === ''
      ) {
        setPaymentDateError('Please enter a valid date');
      }
    }
    if (!error) {
    const payload = {
      order: props.selectedItem.id,
      type: paymentType,
      bank_name: bankName,
      account_name: accountName,
      accountNum: accountNum,
      pdc_date: moment(paymentDate).format('YYYY-MM-DD'),
    };
    props
      .addPaymentMethod(session.user.auth_token, payload)
      .then((res) => {
        if (res.status === 200) {
          props.setModalMessage('Payment Type has been succesfully added.');
          props.setModalError(false);
          props.setSuccessModal(true);
          props.getOrders(session.user.auth_token);
        } else {
          props.setModalMessage('Payment Type cannot be added.');
          props.setModalError(true);
          props.setSuccessModal(true);
        }
      })
      .catch(({ response }) => {
        props.setModalMessage(
          'A server error has occurred. Please try again later.'
        );
        props.setModalError(true);
        props.setSuccessModal(true);
      });
    clearState();
    }
  };

  const markPaid = (event) => {
    event.preventDefault();

    props
      .markPaid(session.user.auth_token, props.selectedItem.uuid)
      .then((res) => {
        if (res.status === 200) {
          props.setModalMessage('Purchase order has been marked as paid.');
          props.setModalError(false);
          props.setSuccessModal(true);
          props.getOrders(session.user.auth_token);
        } else {
          props.setModalMessage('Purchase order cannot be marked as paid.');
          props.setModalError(true);
          props.setSuccessModal(true);
        }
      })
      .catch(({ response }) => {
        props.setModalMessage(
          'A server error has occurred. Please try again later.'
        );
        props.setModalError(true);
        props.setSuccessModal(true);
      });
    clearState();
  };

  const markCancel = (event) => {
    event.preventDefault();

    props
      .markCancel(session.user.auth_token, props.selectedItem.uuid)
      .then((res) => {
        if (res.status === 200) {
          props.setModalMessage('Purchase order has been marked as cancelled.');
          props.setModalError(false);
          props.setSuccessModal(true);
          props.getOrders(session.user.auth_token);
        } else {
          props.setModalMessage('Purchase order cannot be marked as cancelled.');
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
  };

  const handleEditPayment = (event) => {
    event.preventDefault();
    let error = false;
    
    if(paymentType === null && bankName === null && accountNum === null && editPaymentDate === null){
      error = true
      setModalMessage("No changes detected.");
      setModalError(true);
      setSuccessModal(true);
    }
    
    if ((paymentType !== null && paymentType >= 2))  {
      if ((bankName === null || bankName === '') && props.selectedItem.payment_details.bank_name === null ) {
        setBankNameError('Please up field');
        error = true;
      }

      if ((accountNum === null || accountNum === '') && props.selectedItem.payment_details.account_number === null) {
        setAccountNumError('Please up field');
        error = true;
      }
      if ( editPaymentDate !== null){
         if(!moment(editPaymentDate).isValid() || editPaymentDate === '')
            setPaymentDateError('Please enter a valid date');
      }
    }

    if(paymentType === 1){
      setBankName(null)
      setAccountNum(null)
    }

    if(paymentType === null){
      if(props.selectedItem.payment_details.type.id >= 2){
        if (bankName === '' ) {
          setBankNameError('Please up field');
          error = true;
        }
  
        if (accountNum === '') {
          setAccountNumError('Please up field');
          error = true;
        }
        if ( editPaymentDate !== null){
           if(!moment(editPaymentDate).isValid() || editPaymentDate === '')
              setPaymentDateError('Please enter a valid date');
        }
      }
    }

    if (!error) {
  
      const payload = {
        ...(paymentType && {type : paymentType}),
        ...(bankName && {bank_name : bankName}),
        ...(accountName && {account_name: accountName}),
        ...(accountNum && {account_number : accountNum}),
        ...(editPaymentDate && {pdc_date : moment(editPaymentDate).format('YYYY-MM-DD')})

      };
      props
        .editPayment(session.user.auth_token,props.selectedItem.payment_details.uuid, payload)
        .then((res) => {
          if (res.status === 200) {
            props.setModalMessage('Payment Type has been successfully updated.');
            props.setModalError(false);
            props.setSuccessModal(true);
            props.getOrders(session.user.auth_token);
          } else {
            props.setModalMessage('Payment Type cannot be updated.');
            props.setModalError(true);
            props.setSuccessModal(true);
          }
        })
        .catch(({ response }) => {
          props.setModalMessage(
            'A server error has occurred. Please try again later.'
          );
          props.setModalError(true);
          props.setSuccessModal(true);
        });
      clearState();
    }
  };


  const handleEditOrder = (event) => {
    event.preventDefault();
    let error = false;
    
    if(editPurchaseDate === null && note === null ){
      error = true
      setModalMessage("No changes detected.");
      setModalError(true);
      setSuccessModal(true);
    }
    
    if (!error) {
  
      const payload = {
        ...(note && {note : note}),
        ...(note === '' && {note : 'delete_note'}),
        ...(editPurchaseDate && {purchased_date : moment(editPurchaseDate).format('YYYY-MM-DD')})
      }

      
      props
        .editOrder(session.user.auth_token,props.selectedItem.uuid, payload)
        .then((res) => {
          if (res.status === 200) {
            props.setModalMessage('Purchase Order has been succesfully updated.');
            props.setModalError(false);
            props.setSuccessModal(true);
            props.getOrders(session.user.auth_token);
          } else {
            props.setModalMessage('Purchase Order  cannot be updated.');
            props.setModalError(true);
            props.setSuccessModal(true);
          }
        })
        .catch(({ response }) => {
          props.setModalMessage(
            'A server error has occurred. Please try again later.'
          );
          props.setModalError(true);
          props.setSuccessModal(true);
        });
      clearState();
    }
  };

  const clearState = () => {
    props.closeModal();
    setContinue(false);
    setEditOrder(false)
    setEditPayment(false)
    setNote(null)
    setBankNameError('');
    setAccountNumError('');
    setEditPurchaseDate(null)
    setEditPaymentDate(null)
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

  const onDelete = () => {
    props
      .deleteOrder(session.user.auth_token, props.selectedItem.uuid)
      .then((res) => {
        if (res.status === 204) {
          props.setModalMessage('Purchase order has been deleted.');
          props.setModalError(false);
          props.setSuccessModal(true);
          props.getOrders(session.user.auth_token);
        } else if (res.status === 200) {
          props.setModalMessage('Purchase order will be checked for deletion');
          props.setModalError(false);
          props.setSuccessModal(true);
          props.getOrders(session.user.auth_token);
        } else {
          props.setModalMessage('Purchase order cannot be deleted.');
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
  };

  const cancelDelete = () => {
    props
      .declineDelete(session.user.auth_token, props.selectedItem.uuid)
      .then((res) => {
        if (res.status === 200) {
          props.setModalMessage('Purchase order deletion has been cancelled.');
          props.setModalError(false);
          props.setSuccessModal(true);
          props.getOrders(session.user.auth_token);
        } else {
          props.setModalMessage('Purchase order deletion cannot be cancelled.');
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
  };

  const confirm = (message, method) => {
    setVisible(true);
    setConfirmMessage(message);

    setOnConfirm(method);
  };



  const renderEditPayment = () => {
    return (
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
                  Purchase Order Date
                </label>
                <p className="block text-base font-medium ">
                {(moment(
                                    props.selectedItem.created)
                                    .format('MMM DD, YYYY')
                                    .toUpperCase())}
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
                  placeholder="Payment Type"
                  name="item_type"
                  autocomplete="item_type"
                  class="mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option
                    class="text-color-gray-300"
                    value=""
                    disabled
                    hidden
    
                  >
                    Payment Type
                  </option>

                  {props.paymentTypes.map((test) => (
                    <option selected={test.id===props.selectedItem.payment_details.type.id}key={test.id} value={test.id}>
                      {test.name}
                    </option>
                  ))}
                </select>
                {paymentTypeError ? (
                  <span className="text-red-500">{paymentTypeError}</span>
                ) : null}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="sales_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Number
                </label>
                <input
                  autocomplete="off"
                  value={accountNum || accountNum === '' ? accountNum : props.selectedItem.payment_details.account_number ? props.selectedItem.payment_details.account_number : accountNum}
                  onChange={handleAccountNum}
                  disabled={
                    paymentType === null ?  props.selectedItem.payment_details.type.id < 2 ?  true  : false : paymentType < 2 ? true :false
                  }
                  type="text"
                  placeholder="Account Number"
                  name="account_number"
                  id="account_number"
                  className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                {accountNumError ? (
                  <span className="text-red-500">{accountNumError}</span>
                ) : null}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="sales_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Name
                </label>
                <input
                  autocomplete="off"
                  value={bankName || bankName === '' ? bankName  : props.selectedItem.payment_details.bank_name ? props.selectedItem.payment_details.bank_name : bankName}
    
                  onChange={handleBankName}
                  disabled={
                    paymentType === null  ?  props.selectedItem.payment_details.type.id < 2 ?  true  : false : paymentType < 2 ? true :false
                  }
                  type="text"
                  placeholder="Bank Name"
                  name="bank_name"
                  id="bank_name"
                  className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                {bankNameError ? (
                  <span className="text-red-500">{bankNameError}</span>
                ) : null}
              </div>
              <div className="col-span-6 sm:col-span-3 flex flex-col">
                <label
                  for="sales_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Date
                </label>
                <DatePicker
                  className="mt-1 py-2 px-2 w-full focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  selected={editPaymentDate ? editPaymentDate : props.selectedItem.payment_details.pdc_date ?  new Date(props.selectedItem.payment_details.pdc_date) :  new Date(props.selectedItem.payment_details.created)  ?  new Date(props.selectedItem.payment_details.created)  : paymentDate}
                  onChange={(date) => {
                    setPaymentDateError(null);
                    setEditPaymentDate(date);
                  }}
                />
                {paymentDateError ? (
                  <span className="text-red-500">{paymentDateError}</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderEditOrder = () => {
    return (
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
                  Purchase Order Date
                </label>
                <p className="block text-base font-medium ">
                {(moment(
                                    props.selectedItem.created)
                                    .format('MMM DD, YYYY')
                                    .toUpperCase())}
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

              <div className="col-span-6 sm:col-span-3 flex flex-col">
                <label
                  for="sales_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Purchased Date
                </label>
                <DatePicker
                  className="mt-1 py-2 px-2 w-full focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  selected={editPurchaseDate ? editPurchaseDate : props.selectedItem.purchased_date ?  new Date(props.selectedItem.purchased_date ) : editPurchaseDate}
                  onChange={(date) => {
                    setPaymentDateError(null);
                    setEditPurchaseDate(date);
                  }}
                />
                {paymentDateError ? (
                  <span className="text-red-500">{paymentDateError}</span>
                ) : null}
              </div>
  
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="sales_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note
                </label>
                <input
                  autocomplete="off"
                  value={note  || note === '' ? note : props.selectedItem.note ? props.selectedItem.note : note}
                  onChange={handleNote}
            
                  type="text"
                  placeholder="Note"
                  name="note"
                  id="note"
                  className="mt-1 py-2 px-2 focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                {accountNumError ? (
                  <span className="text-red-500">{accountNumError}</span>
                ) : null}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
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
                <SuccessModal
                  showModal={successModal}
                  closeModal={() => setSuccessModal(false)}
                  message={modalMessage}
                  hasError={modalError}
                />
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md bg-">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      {!isContinue && !editPayment && !editOrder ? (
                        <>
                          <div className="grid grid-cols-9 gap-6">
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
                                  : props.selectedItem.payment_details
                                      .pdc_date
                                  ? moment(
                                      props.selectedItem.payment_details.pdc_date
                                    )
                                      .format('MMM DD, YYYY')
                                      .toUpperCase()
                                  : moment(
                                      props.selectedItem.payment_details
                                        .created
                                    )
                                      .format('MMM DD, YYYY')
                                      .toUpperCase()}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-6 flex-wrap">
                              <label
                                for="shipment_date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Note
                              </label>
                              <p className="block text-base font-medium break-words">
                                {props.selectedItem.note === null
                                  ? 'N/A' :
                                  (props.selectedItem.note )}
                              </p>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="shipment_date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Purchased Date
                              </label>
                              <p className="block text-base font-medium ">
                                {props.selectedItem.purchased_date === null
                                  ? 'N/A' :
                                  (moment(
                                    props.selectedItem.purchased_date)
                                    .format('MMM DD, YYYY')
                                    .toUpperCase())}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 max-h-80 overflow-y-auto">
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
                                        <div className="h-8 w-8  bg-white rounded-full border justify-center flex">
                                          <img
                                         src={
                                          props.selectedItem.items[index]
                                          .product ?
                                          props.selectedItem.items[index]
                                            .product.images[0]
                                            ? props.selectedItem.items[
                                                index
                                              ].product.images[0].image
                                            : '/img/sketch.jpg'
                                          :'/img/sketch.jpg'
                                        }
                                            className="h-full overflow-hidden bg-white rounded-full  object-fit"
                                            alt="..."
                                          ></img>
                                        </div>
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
                      ) : editPayment ? renderEditPayment() : editOrder ? renderEditOrder() : (
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
                                    Purchase Order Date
                                  </label>
                                  <p className="block text-base font-medium ">
                                  {(moment(
                                    props.selectedItem.created)
                                    .format('MMM DD, YYYY')
                                    .toUpperCase())}
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
                                  {paymentTypeError ? (
                  <span className="text-red-500">{paymentTypeError}</span>
                ) : null}
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
                                          {accountNumError ? (
                  <span className="text-red-500">{accountNumError}</span>
                ) : null}
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
                                       {bankNameError ? (
                  <span className="text-red-500">{bankNameError}</span>
                ) : null}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    for="sales_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Payment Date
                                  </label>
                                  <DatePicker
                                    disabled={
                                      paymentType === null 
                                        ? true
                                        : false
                                    }
                                    className="mt-1 py-2 px-2 w-full focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    selected={paymentDate}
                                    onChange={(date) => {
                                      setPaymentDate(date);
                                    }}
                                  />
                                    {paymentDateError ? (
                  <span className="text-red-500">{paymentDateError}</span>
                ) : null}
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
                        {props.forDelete && !props.isPaid? (
                          <>
                            {/* <button
                              className="bg-transparent text-black hover:text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => clearState()}
                            >
                              Close
                            </button> */}
                            <button
                              disabled={
                                session.user.user.is_superuser ? false : true
                              }
                              className={`bg-red-600 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 
                              ${
                                session.user.user.is_superuser
                                  ? 'hover:bg-red-700'
                                  : 'opacity-60 cursor-not-allowed'
                              }`}
                              type="button"
                              onClick={(event) => {
                                confirm(
                                  'Are you sure you want to cancel deletion?',
                                  'cancel_delete'
                                );
                              }}
                            >
                              {'Cancel Deletion'}
                            </button>
                            <button
                              disabled={
                                session.user.user.is_superuser ? false : true
                              }
                              className={`bg-green-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                              ${
                                session.user.user.is_superuser
                                  ? 'hover:bg-green-700'
                                  : 'opacity-60 cursor-not-allowed'
                              }`}
                              type="button"
                              onClick={(event) => {
                                confirm(
                                  'Are you sure you want to delete the order?',
                                  'delete'
                                );
                              }}
                            >
                              Delete Purchase Order
                            </button>
                          </>
                        ) : props.isPaid ? editPayment || editOrder ? 
                        (<>

                          <button
                            className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={(event) => {
                              setEditPayment(false);
                              setEditOrder(false)
                              setNote('')
                              setEditPaymentDate(null)
                              setEditPurchaseDate(null)
                              setPaymentType(null)
                              setAccountNum(null)
                              setBankName(null)
                            }}
                          >
                            {'Back'}
                          </button>
                   
                          <button
                            className={`bg-green-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                          `}
                            type="button"
                            onClick={(event) =>{
                              if(editPayment)
                                handleEditPayment(event)
                              else  if(editOrder)
                                handleEditOrder(event)

                            }}
                          >
                            {'Submit'}
                          </button>
                      </>)
                        : (
                          // <button
                          //   className="bg-red-600 text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          //   type="button"
                          //   onClick={() => props.closeModal()}
                          // >
                          //   Close
                          // </button>
                          <>
                          <button
                          className="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={(event) => {
                            setEditOrder(true)
                          }}
                            >
                            { 'Edit Order Details' }
                          </button>
                          <button
                          className="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={(event) => {
                            setEditPayment(true)
                          }}
                            >
                            { 'Edit Payment Details' }
                          </button>
                          </>
                        ) : props.selectedItem.payment_details !== null &&
                          props.selectedItem.payment_details.type.id === 2 ? (
                          <>
                            {/* <button
                              className="bg-transparent text-black hover:text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => props.closeModal()}
                            >
                              Close
                            </button> */}
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
                            {/* <button
                              className="bg-transparent text-black hover:text-white hover:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => clearState()}
                            >
                              Close
                            </button> */}
                            {!isContinue ? (
                            <button
                              className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(event) => {
                                confirm(
                                  'Are you sure you want to delete the Order?',
                                  'delete'
                                );
                              }}
                            >
                              Delete
                            </button>
                            ):null}
                            <button
                              className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(event) => {
                                !isContinue
                                  ? markCancel(event)
                                  : setContinue(false);
                              }}
                            >
                               {!isContinue ? 'Cancel' : 'Back'}
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
      <ConfirmModal
        isVisible={isVisible}
        closeModal={() => setVisible(false)}
        message={confirmMessage}
        onConfirm={() => {
          onConfirm === 'delete'
            ? onDelete()
            : 'cance_delete'
            ? cancelDelete()
            : null;
          setVisible(false);
        }}
      />
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
  deleteOrder: (authToken, uuid) =>
    dispatch(orderActions.deleteOrder(authToken, uuid)),
  declineDelete: (authToken, uuid) =>
    dispatch(orderActions.declineDelete(authToken, uuid)),
  markCancel: (authToken, uuid) =>
    dispatch(orderActions.cancelOrder(authToken, uuid)),
  getOrders: (token) => {
    dispatch(orderActions.getOrders(token));
  },
  editPayment: (token, uuid, payload) =>
  dispatch(orderActions.editPayment(token, uuid, payload)),
  editOrder: (token, uuid, payload) =>
  dispatch(orderActions.editOrder(token, uuid, payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailsModal)
);
