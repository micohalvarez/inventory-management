import React, { useState } from 'react';

// components

import AdminNavbar from '../components/Navbars/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import HeaderStats from '../components/Headers/HeaderStats';

export default function Admin(props) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <Sidebar showNav={props.showSideBar} />

      <div
        className={`relative bg-gray-200 ${
          props.showSideBar ? ' md:ml-64' : ''
        }`}
      >
        <HeaderStats />
        <div className="mx-auto flex flex-col w-full min-h-screen -m-16">
          {props.children}
        </div>
      </div>
    </div>
  );
}
