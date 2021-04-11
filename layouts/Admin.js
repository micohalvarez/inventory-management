import React, { useState } from 'react'

// components

import AdminNavbar from '../components/Navbars/AdminNavbar'
import Sidebar from '../components/Sidebar/Sidebar'
import HeaderStats from '../components/Headers/HeaderStats'
import FooterAdmin from '../components/Footers/FooterAdmin'

export default function Admin ({ children }) {
    const [showNav, setShowNav] = useState(false)
    return (
        <>
            <Sidebar showNav={showNav} />
            <div className="relative md:ml-64 bg-gray-200">
                <AdminNavbar setShowNav={setShowNav} showNav={showNav} />
                {/* Header */}
                <HeaderStats />
                <div className="mx-auto flex flex-col w-full min-h-screen -m-16">
                    {children}

                    {/* <FooterAdmin /> */}
                </div>
            </div>
        </>
    )
}
