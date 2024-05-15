const Pagination = ({ totalPages, currentPages, setCurrentPages }) => {
  const handlePageChange = (page) => {
      setCurrentPages(page); // Update the current page
  };

  return (
      <>
          <div className="flex justify-center items-center">
              {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
              ).map((page) => (
                  <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={currentPages === page}
                      value={page}
                      className={`inline-block text-gray-800 font-semibold py-2 px-4 ${
                          currentPages === page
                              ? "pointer-events-none" && "underline"
                              : ""
                      }`}
                  >
                      {page}
                  </button>
              ))}
          </div>
          <div className="flex justify-end items-end p-6">
              Page {currentPages} from {totalPages}
          </div>
      </>
  );
};

export default Pagination;