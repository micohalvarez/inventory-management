/* eslint-disable react/prop-types */
/* eslint-disable no-tabs */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSession } from 'next-auth/client'

// layout for page

import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import * as authActions from '../../redux/actions/authActions'

const Login = (props) => {
    const [emailAddress, setEmailAddress] = useState('')

    const [password, setPassword] = useState('')
    const [hasError, setHasError] = useState(false)

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [loading, setLoading] = useState(false)

    const handleEmail = (event) => {
        event.preventDefault()
        setEmailError('')
        setEmailAddress(event.target.value)
    }

    const handlePassword = (event) => {
        event.preventDefault()
        setPasswordError('')
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmailError('')
        setPasswordError('')
        setLoading(true)

        let error = false

        if (emailAddress === '') {
            setEmailError('Please up field')
            error = true
        }

        if (password === '') {
            setPasswordError('Please up field')
            error = true
        }

        if (error) {
            setHasError(true)
        } else {
            const payload = {
                emailAddress: emailAddress,
                password: password
            }

            // props.login(payload)
            props.loginNextAuth(payload)
        }
    }

    return (
        <>
            <div className="container flex flex-col bg-gray-700 min-w-full min-h-screen justify-center">
                <div className="flex  items-center justify-center alh-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div className="rounded-t mb-0 px-6 py-6"></div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-gray-500 text-center mb-3 font-bold">
                                    <medium>Sign in with credentials</medium>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
											Username
                                        </label>
                                        <input
                                            value={emailAddress}
                                            onChange={handleEmail}
                                            type="text"
                                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                            placeholder="Username"
                                        />
                                        {emailError ? (
                                            <span className="text-red-500">{emailError}</span>
                                        ) : null}
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
											Password
                                        </label>
                                        <input
                                            value={password}
                                            onChange={handlePassword}
                                            type="password"
                                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                            placeholder="Password"
                                        />
                                        {passwordError ? (
                                            <span className="text-red-500">{passwordError}</span>
                                        ) : null}
                                    </div>

                                    <div className="text-center mt-6">
                                        {/* <button type="button">Sign In</button> */}
                                        <input
                                            className="cursor-pointer bg-gray-900 hover:bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            value="Submit"
                                        />
                                        {/* <div className="text-center mt-6">
											<button
												type="button"
												className="flex justify-center cursor-pointer bg-gray-900 hover:bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
												disabled
											>
												Processing
												{loading ? (
												<svg
													class="animate-spin bg-transparent h-5 w-5 ml-3 border-white border-2 rounded-2xl"
													viewBox="0 0 24 24"
												></svg>
												) : null}
											</button>
											</div> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                className="text-gray-800 text-base"
                            >
								Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    login: (payload) => dispatch(authActions.login(payload)),
    loginNextAuth: (payload) => dispatch(authActions.loginNextAuth(payload))
})

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
