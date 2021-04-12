/* eslint-disable react/prop-types */
import React from 'react'
import Head from 'next/head'
import { wrapper } from '../redux/store'
import { Provider } from 'next-auth/client'
import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <div className="body">
                <Head>
                    <title>Inventory Management System</title>
                    <link rel="shortcut icon" href="/public/favicon.ico" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}

export default wrapper.withRedux(MyApp)
