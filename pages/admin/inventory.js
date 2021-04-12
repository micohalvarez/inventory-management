import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import { getSession, signOut } from 'next-auth/client'

// components

import InventoryTable from '../../components/Cards/InventoryTable'

// layout for page

import Admin from '../../layouts/Admin'
import * as localStorage from '../../utils/local-storage'
import * as inventoryActions from '../../redux/actions/inventoryActions'

const Inventory = (props) => {
    const [authToken, setAuthToken] = useState(false)

    useEffect(() => {
        // const authCreds = localStorage.getLocalStorage('authCreds')
        // console.log(props.session)

        // if (!authCreds) {
        //     Router.push('/')
        // } else {
        //     setAuthToken(authCreds.authToken)
        //     props.getItems(authCreds.authToken)
        //     props.getCategories(authCreds.authToken)
        // }
    }, [])

    const signOutClick = () => {
        signOut()
    }

    return (
        <Admin>
            <div className="flex flex-wrap mt-10">
                <div className="w-full h-full mb-12 px-4 mt-16 flex flex-col mt-1 justify-center">
                    <button onClick={signOutClick}>SIGN OUT</button>
                    <InventoryTable items={props.items} authToken={authToken} />
                </div>
            </div>
        </Admin>
    )
}

const mapStateToProps = (state) => ({
    items: state.inventory.items
})

const mapDispatchToProps = (dispatch) => ({
    getItems: (authToken) => dispatch(inventoryActions.getItems(authToken)),
    getCategories: (authToken) =>
        dispatch(inventoryActions.getCategories(authToken))
})

export async function getServerSideProps (context) {
    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Inventory)
)
