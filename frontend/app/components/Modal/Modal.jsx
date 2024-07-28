import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ isVisible, onClose, children, title }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white rounded-md h-fit md:h-fit w-auto md:w-fit p-5">
        <div className="grid grid-flow-col p-5">
          <p className="font-bold text-lg md:text-xl lg:text-3xl">{title}</p>
          <XMarkIcon
            onClick={() => onClose()}
            className="place-self-end cursor-pointer"
            width={28}
            height={28}
          />
        </div>
        <div className="p-2 max-h-full max-w-2xl overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
