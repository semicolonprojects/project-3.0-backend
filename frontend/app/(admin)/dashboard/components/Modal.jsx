import React from "react";

const Modal = () => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
          <div className="mt-4">
            {/* Your modal content goes here */}
            <p>This is a modal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
