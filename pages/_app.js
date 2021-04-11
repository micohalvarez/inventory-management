import React, { useEffect } from 'react';
import Head from 'next/head';
import { wrapper } from '../redux/store';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="body">
      <Head>
        <title>Inventory Management System</title>
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default wrapper.withRedux(MyApp);
