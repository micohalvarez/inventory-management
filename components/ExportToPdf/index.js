// import React, { Component, useEffect, useState } from 'react';

// import { connect } from 'react-redux';

// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFDownloadLink,
//   ReactPDF,
// } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 10,
//   },
//   section: {
//     flexDirection: 'row',
//   },
//   section1: {
//     flex: 6,
//   },
//   section2: {
//     flex: 4,
//   },
//   text: {
//     fontSize: 14,
//     margin: 12,
//   },
//   qr: {
//     height: 120,
//     width: 120,
//     right: 0,
//   },
//   image: {
//     height: 200,
//     width: 200,
//     backgroundColor: '#eee',
//     objectFit: 'contain',
//     margin: 12,
//   },
//   imageBig: {
//     height: 270,
//     width: 270,
//     backgroundColor: '#eee',
//     objectFit: 'contain',
//     margin: 10,
//   },
// });

// const ExportToPdf = (props) => {
//   const [pdf, setPdf] = useState(null);

//   const renderPDF = () => {
//     return (
//       <Document>
//         <Page size="LETTER" style={styles.page}>
//           <View style={styles.section}>
//             <View style={styles.section1}></View>
//           </View>
//         </Page>
//       </Document>
//     );
//   };

//   const getPdf = () => {
//     console.log(pdf);
//     return pdf;
//   };

//   return (
//     <>
//       {pdf ? (
//         <PDFDownloadLink document={renderPDF} fileName={'test.pdf'}>
//           {({ blob, url, loading, error }) =>
//             loading ? 'Loading document...' : <button>Download now</button>
//           }
//         </PDFDownloadLink>
//       ) : (
//         <button
//           className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//           type="button"
//           onClick={() => setPdf(renderPDF())}
//         >
//           Generate PDF
//         </button>
//       )}
//     </>
//   );
// };

// export default ExportToPdf;

import React, { Component } from 'react';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  BlobProvider,
  pdf,
  Image,
} from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: '1',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textContainer: {
    flex: '1',
  },
  text: {
    fontSize: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: {
    width: '14.2857142857%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10 },
});

class ExportWinnertoPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf: null,
    };
  }

  getPdfDocument() {
    return this.state.pdf;
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getSpecificUser() {
    console.log(this.props)
    var a = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Sales Order Receipt</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.textContainer}>
              <Text
                style={styles.text}
              >{`Sales Order #: \n ${this.props.order.order_number}`}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Created By:  \n ${
                  this.props.order.created_by.first_name +
                  ' ' +
                  this.props.order.created_by.last_name
                }`}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Created At:  \n ${moment(this.props.order.created)
                  .format('MMM DD, YYYY')
                  .toUpperCase()}`}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Status:  \n ${this.props.order.status.toUpperCase()}`}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Payment Type:  \n${
                  this.props.order.payment_details
                    ? this.props.order.payment_details.type.name
                    : 'N/A'
                }`}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Payment Date:  \n${
                  this.props.order.payment_details === null
                    ? 'N/A'
                    : this.props.order.payment_details.type.id !== 2
                    ? moment(this.props.order.payment_details.created)
                        .format('MMM DD, YYYY')
                        .toUpperCase()
                    : moment(this.props.order.payment_details.pdc_date)
                        .format('MMM DD, YYYY')
                        .toUpperCase()
                }`}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
              {`Received By:  \n ${
                  this.props.order.received_by.first_name +
                  ' ' +
                  this.props.order.received_by.last_name
                }`}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Customer Name:  \n${
                  this.props.order.customer_name
                    ? this.props.order.customer_name
                    : 'N/A'
                }`}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            {/* TableHeader */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Code</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Quantity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Item Price</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Item Discount</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Box Price</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Item Total</Text>
              </View>
           
    
            </View>
            {/* TableContent */}
            {Object.keys(this.props.order.items).map((name, index) => (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {this.props.order.items[index].product_code}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {this.props.order.items[index].product_name}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {'x' + this.props.order.items[index].quantity}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {`${
                      this.props.order.items[index].unit_price
                    } `}
                  </Text>
                </View>
         

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {`${
                      this.props.order.items[index].item_discount * 100
                    }%`}
                  </Text>
                </View>

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {`${
                      this.props.order.items[index].box_amount
                    }`}
                  </Text>
                </View>

              
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                  {`${  parseFloat(((this.props.order.items[index].unit_price * this.props.order.items[index].quantity) - ((this.props.order.items[index].unit_price * this.props.order.items[index].quantity) * this.props.order.items[index].item_discount)) + parseFloat(this.props.order.items[index].box_amount)).toFixed(2)}`}
                  </Text>
                </View>
       
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Total Discount (%)  \n ${
                  parseFloat(this.props.order.total_discount * 100).toFixed(2) +
                  '%'
                }`}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Total Discount  \n ${this.numberWithCommas(
                  parseFloat(
                    this.props.order.total - this.props.order.subtotal
                  ).toFixed(2)
                )} PHP
                `}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Subtotal \n ${this.numberWithCommas(
                  parseFloat(this.props.order.subtotal).toFixed(2)
                )} PHP
                `}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {`Total Amount  \n ${this.numberWithCommas(
                  parseFloat(this.props.order.total).toFixed(2)
                )} PHP
                `}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );

    this.setState({ pdf: a });

    return a;
  }

  render() {
    return (
      <>
        {this.state.pdf ? (
          <PDFDownloadLink
            document={this.getPdfDocument()}
            fileName={`orders.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                'Loading document...'
              ) : (
                <button
                  onClick={() => {
                    this.setState({ pdf: null });
                    this.props.closeModal();
                    this.props.setModalMessage(
                      'PDF has been succesfully downloaded.'
                    );
                    this.props.setModalError(false);
                    this.props.setSuccessModal(true);
                  }}
                  className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Download now
                </button>
              )
            }
          </PDFDownloadLink>
        ) : (
          <button
            className="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              this.getSpecificUser();
            }}
          >
            Generate PDF
          </button>
        )}
      </>
    );
  }
}

export default ExportWinnertoPDF;
