import React, { useEffect, useState } from 'react';

// components

import DashboardTable from '../../components/Cards/DashboardTable';

// layout for page

import Admin from '../../layouts/Admin';
import * as localStorage from '../../utils/local-storage';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as dashboardActions from '../../redux/actions/dashboardActions';

import * as salesActions from '../../redux/actions/salesActions';

const Dashboard = (props) => {
    const [authToken, setAuthToken] = useState(false)

    useEffect(() => {
        // const authCreds = localStorage.getLocalStorage('authCreds')

        // if (!authCreds) {
        //     Router.push('/')
        // } else {
        //     setAuthToken(authCreds.authToken)
        //     props.getSales(authCreds.authToken)
        //     props.getItems(authCreds.authToken)
        //     props.getCategories(authCreds.authToken)
        // }
    }, [])

    return (
        <Admin>
            <div className="flex flex-wrap mt-10">
                <div className="w-full h-full mb-12 px-4 mt-16 flex flex-row mt-1 justify-center">
                    <DashboardTable
                        sales={props.sales}
                        items={props.items}
                        authToken={authToken}
                    />
                </div>
            </div>
        </Admin>
    )
}

const mapStateToProps = (state) => ({
  items: state.dashboard.items,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (authToken) => dispatch(dashboardActions.getItems(authToken)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
