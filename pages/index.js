import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { getSession } from 'next-auth/client'

import Login from './admin/login'

const App = (props) => {
    return <Login />
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = (dispatch) => ({})

export async function getServerSideProps (context) {
    const session = await getSession({ req: context.req })

    if (session) {
        return {
            redirect: {
                destination: '/admin/inventory',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
