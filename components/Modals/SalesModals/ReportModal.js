import { useSession } from 'next-auth/client';
import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Headers = [
  { label: 'Order Number', key: 'order_number' },
  { label: 'Item Name', key: 'item_name' },
  { label: 'Total Amount', key: 'total_amount' },
  { label: 'Total Quantity', key: 'quantity' },
  { label: 'Order Type', key: 'type' },
  { label: 'Date Created', key: 'date_created' },
  { label: 'Created By', key: 'created_by' },
];

const ReportModal = (props) => {
  const [selectedItem, setSelectedItem] = useState(false);
  const [session, loading] = useSession();
  const [reportData, setReportData] = useState([]);
  const [csvLink, setCsvLink] = useState(null);
  const [reportDate, setReportDate] = useState(null);
  const [itemError, setItemError] = useState(null);
  const [loadingBar, setLoadingBar] = useState(false);

  const getOrdersPerItem = () => {
    let finalReport = [{}];
    setLoadingBar(true);
    if (!selectedItem) {
      setItemError('Please select an Item');
      setLoadingBar(false);
      return;
    }

    props
      .getOrdersPerItem(session.user.auth_token, selectedItem)
      .then((res) => {
        if (res.status === 200 && res.data.results) {
          res.data.results.map((item, index) => {
            finalReport.push({
              item_name: '',
              order_number: '',
              date_created: '',
              total_amount: '',
              quantity: '',
              created_by: '',
              type: '',
            });

            finalReport[index].item_name = item.items[0].product_name;
            finalReport[index].order_number = item.order_number;
            finalReport[index].date_created = moment(item.created)
              .format('MMM DD, YYYY')
              .toUpperCase();
            finalReport[index].total_amount = item.total;
            finalReport[index].quantity = item.items[0].quantity;
            finalReport[index].created_by = item.created_by.username;
            finalReport[index].type = item.type;
          });
          setLoadingBar(false);
          setReportData(finalReport);
          generateReport();
        }
      })
      .catch(({ response }) => {
        setLoadingBar(false);
        alert('A server error has occured');
      });
  };

  const generateReport = () => {
    setTimeout(
      function () {
        csvLink.link.click();
      }.bind(this),
      2000
    );
  };
  return (
    <>
      <CSVLink
        data={reportData}
        headers={Headers}
        filename={
          moment(new Date()).format('MM-DD-YY').toUpperCase() + `_orders.csv`
        }
        target="_blank"
        className="hiddencsv"
        ref={(r) => setCsvLink(r)}
      ></CSVLink>

      {props.showModal ? (
        <>
          <div class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="relative my-6 mx-auto w-full max-w-4xl">
              {/*content*/}
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 class="text-3xl font-semibold">
                    Generate Item Orders Report
                  </h3>
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
                  <div class="px-4 sm:px-0">
                    <label
                      for="sales_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Item
                    </label>
                  </div>
                  <div style={{ maxWidth: '350px' }}>
                    <Select
                      options={props.allItems}
                      labelField={'name'}
                      valueField={'id'}
                      searchBy={'name'}
                      className="flex"
                      onChange={(value) => {
                        setItemError(null);
                        setSelectedItem(value[0].slug);
                      }}
                    />
                    {itemError ? (
                      <span className="text-red-500">{itemError}</span>
                    ) : null}
                  </div>
                  <div class="mt-4 sm:px-0">
                    <label
                      for="sales_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Created Date (Optional)
                    </label>
                    <DatePicker
                      className="mt-1 py-2 px-2 w-full focus:outline-none focus:ring-border-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      selected={reportDate}
                      onChange={(date) => {
                        setReportData(date);
                      }}
                    />
                  </div>
                  <button
                    className="mt-3 hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => getOrdersPerItem()}
                  >
                    Generate Report
                    {loadingBar ? (
                      <div class="ml-2 rounded-lg animate-spin ease duration-300 w-5 h-5 border-2 border-white"></div>
                    ) : null}
                  </button>
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

export default ReportModal;
