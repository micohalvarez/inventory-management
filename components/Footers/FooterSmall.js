import React from 'react';

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? 'absolute w-full bottom-0 bg-gray-900'
            : 'relative') + ' pb-6'
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-gray-700" />
          <div className="flex justify-center">
            <div className="text-sm text-gray-600 self-center font-semibold py-1 text-center md:text-left">
              Copyright © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
