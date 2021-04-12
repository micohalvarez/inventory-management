import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

const App = (props) => {
    // useEffect(() => {
    //     Router.push('/admin/login')
    // })

    return null
}

export async function getServerSideProps (context) {
    return {
        redirect: {
            destination: '/admin/login',
            permanent: false
        }
    }
}

export default App
