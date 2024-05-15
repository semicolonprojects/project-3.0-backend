"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
      <>
          {isOpen && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                  {/* Modal Content */}
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      {/* Background Overlay */}
                      <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                      >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                      </div>
                      {/* Modal Panel */}
                      <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                      >
                          &#8203;
                      </span>
                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                          {/* Modal Content */}
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      <h3
                                          className="text-lg leading-6 font-medium text-gray-900"
                                          id="modal-headline"
                                      >
                                          {title}
                                      </h3>
                                      <div>
                                          {/* Use XMarkIcon here for close button */}
                                          <button
                                              onClick={onClose}
                                              className="absolute top-3 right-3 text-black hover:text-gray-500 focus:outline-none"
                                          >
                                              <XMarkIcon className="h-6 w-6" />
                                          </button>
                                      </div>
                                      <div className="mt-2">{children}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </>
  );
};

export default Modal;