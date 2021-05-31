const SuccessModal = (props) => {
  return (
    <>
      {props.showModal ? (
        <div
          class={
            'animated fadeIn duration-500 mb-2  border-t-4  rounded-b  px-4 py-3 shadow-md ' +
            (props.hasError
              ? 'bg-red-200 border-red-500 text-red-900'
              : 'bg-green-200 border-green-500 text-teal-900')
          }
          role="alert"
        >
          <div class="flex ">
            <div class="py-1">
              <svg
                class={
                  'fill-current h-6 w-6  mr-4 ' +
                  (props.hasError ? 'text-red-500' : 'text-teal-500')
                }
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>

            <div>
              <p class="font-bold">{props.hasError ? 'Error' : 'Success'}</p>
              <p class="text-sm">{props.message}</p>
            </div>
            <button
              onClick={() => props.closeModal()}
              className=" ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
            >
              <span
                className={
                  'bg-transparent h-8 w-8 text-3xl block outline-none focus:outline-none ' +
                  (props.hasError ? 'text-red-700' : 'text-green-700')
                }
              >
                ×
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SuccessModal;
