import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'

// components

import SalesTable from '../../components/Cards/SalesTable'

// layout for page

import Admin from '../../layouts/Admin'
import * as localStorage from '../../utils/local-storage'
import * as salesActions from '../../redux/actions/salesActions'
import * as inventoryActions from '../../redux/actions/inventoryActions'

const Sales = (props) => {
    const [authToken, setAuthToken] = useState(false)

    useEffect(() => {
        const authCreds = localStorage.getLocalStorage('authCreds')

        if (!authCreds) {
            Router.push('/')
        } else {
            setAuthToken(authCreds.authToken)
            props.getSales(authCreds.authToken)
            props.getItems(authCreds.authToken)
            props.getPaymentTypes(authCreds.authToken)
        }
    }, [])

    console.log(props)

    return (
        <Admin>
            <div className="flex flex-wrap mt-10 ">
                <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
                    <SalesTable sales={props.sales} authToken={authToken} />
                </div>
            </div>
        </Admin>
    )
}

const mapStateToProps = (state) => ({
    sales: state.sales.sales,
    items: state.inventory.items
})

const mapDispatchToProps = (dispatch) => ({
    getSales: (authToken) => dispatch(salesActions.getSales(authToken)),
    getSalesWithFilter: (authToken) =>
        dispatch(salesActions.getSalesWithFilter(authToken, filter)),
    getItems: (authToken) => dispatch(inventoryActions.getItems(authToken)),
    getPaymentTypes: (authToken) =>
        dispatch(salesActions.getPaymentTypes(authToken))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sales))
