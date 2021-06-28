const ConfirmModal = (props) => {
  return (
    <>
      {props.isVisible ? (
        <>
          <div class="justify-center items-center bg-gray-500 bg-opacity-75 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div class="relative my-6 mx-auto w-full max-w-md">
              {/*content*/}
              <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div class="flex items-center  justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 class="text-2xl self-center font-semibold">
                    Please Confirm
                  </h3>
                  <button
                    class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.closeModal()}
                  >
                    <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div class="p-6 flex-auto justify-center flex  flex-col items-center  mt-10 sm:mt-0">
                  <div class="px-4 sm:px-0 justify-center flex">
                    <h3 for="sales_date" className="text-gray-700">
                      {props.message}
                    </h3>
                  </div>

                  <div className="flex flex-row">
                    <button
                      className="mt-3 hover:bg-red-800 bg-red-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => props.closeModal()}
                    >
                      Cancel
                    </button>
                    <button
                      className="mt-3 hover:bg-gray-800 bg-gray-700 self-end flex text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={props.onConfirm}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ConfirmModal;
