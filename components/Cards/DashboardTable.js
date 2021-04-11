/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'

// components

import TableDropdown from '../Dropdowns/TableDropdown.js'
import InventoryType from '../Dropdowns/InventoryType'

import FormModal from '../Modals/Inventorymodals/FormModal'
import DetailsModal from '../Modals/Inventorymodals/DetailsModal'
import EditModal from '../Modals/Inventorymodals/EditModal'
import * as inventoryActions from '../../redux/actions/inventoryActions'

const DashBoardTable = (props) => {
    const [showFormModal, setFormShowModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(false)

    const onPressRow = (item) => {
        setSelectedItem(item)
        setShowDetailsModal(true)
    }

    return (
        <>
            <FormModal
                addItem={props.addItem}
                authToken={props.authToken}
                showModal={showFormModal}
                categories={props.categories}
                closeModal={() => setFormShowModal(false)}
            />
            <DetailsModal
                selectedItem={selectedItem}
                showModal={showDetailsModal}
                closeModal={() => setShowDetailsModal(false)}
            />
            <EditModal
                selectedItem={selectedItem}
                showModal={showEditModal}
                closeModal={() => setShowEditModal(false)}
            />

            <div className="mr-4 flex flex-1 flex-col">
                <span>Low on Stock Items</span>
                <div
                    className={
                        'mt-4 relative  min-w-0 break-words w-full mb-12 flex-1 shadow-lg rounded '
                    }
                >
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead className="bg-gray-100 ">
                                <tr>
                                    <th
                                        className={
                                            'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                                        }
                                    >
										Item Code
                                    </th>
                                    <th
                                        className={
                                            'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                                        }
                                    >
										Remaining Stock
                                    </th>
                                    <th
                                        className={
                                            'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                                        }
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.items ? (
                                    <>
                                        {props.items.map((item, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => onPressRow(item)}
                                                className="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
                                            >
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                                                    <div className="h-14 w-14  bg-white rounded-full border justify-center flex">
                                                        <img
                                                            src={
                                                                item.images[0]
                                                                    ? item.images[0].image
                                                                    : '/img/sketch.jpg'
                                                            }
                                                            className="h-full overflow-hidden bg-white rounded-full  object-fit"
                                                            alt="..."
                                                        ></img>
                                                    </div>
                                                    <span className={'ml-3 font-bold '}>{item.code}</span>
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                                    {item.stock}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                                    <button
                                                        className="hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setFormShowModal(true)}
                                                    >
														Order Item
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <span>Notifications</span>
                <div
                    className={
                        'mt-4 relative flex flex-1 flex-col min-w-0 break-words w-full mb-12 flex-1 shadow-lg rounded '
                    }
                >
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead className="bg-gray-100 ">
                                <tr>
                                    <th
                                        className={
                                            'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                                        }
                                    >
					Sales Order Number
                                    </th>
                                    <th
                                        className={
                                            'px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left '
                                        }
                                    >
					Payment Release Date
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.sales ? (
                                    <>
                                        {props.sales.map((item, index) => (
                                            <tr
                                                key={index}
                                                onClick={() => onPressRow(item)}
                                                className="hover:bg-gray-200 cursor-pointer bg-gray-100 text-gray-800 border-gray-200"
                                            >
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4 text-left flex items-center">
                                                    <div className="h-14 w-14  bg-white rounded-full border justify-center flex">
                                                        <img
                                                            src={'/img/sketch.jpg'}
                                                            className="h-full overflow-hidden bg-white rounded-full  object-fit"
                                                            alt="..."
                                                        ></img>
                                                    </div>
                                                    <span className={'ml-3 font-bold '}>{item.id}</span>
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                                    {new Date().toDateString()}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-no-wrap p-4">
                                                    <button
                                                        className="hover:bg-green-800 bg-green-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setFormShowModal(true)}
                                                    >
							View Sales Order
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    items: state.inventory.items,
    categories: state.inventory.categories
})

const mapDispatchToProps = (dispatch) => ({
    getItemsWithFilter: (authToken, filter) =>
        dispatch(inventoryActions.getItemsWithFilter(authToken, filter)),
    addItem: (authToken, payload) =>
        dispatch(inventoryActions.addItem(authToken, payload))
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DashBoardTable)
)
