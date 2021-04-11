import React from 'react';

export default function FooterAdmin() {
  return (
    <>
      <footer className="flex flex-row py-4 justify-center bg-black ">
        <div className="container mx-auto px-4 ">
          <hr className="mb-4 border-b-1 border-gray-300" />
          <div className="flex flex-wrap items-center bg-black justify-center">
            <ul className="flex flex-wrap list-none ">
              <li>
                <a
                  href="https://www.creative-tim.com/presentation?ref=nnjs-footer-admin"
                  className="text-gray-700 hover:text-gray-900 text-align-center bg-white text-sm font-semibold block py-1 px-3"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
