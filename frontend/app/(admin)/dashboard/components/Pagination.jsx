import React from "react";

export default function Pagination({
    currentPage,
    totalPages,
    inputValue,
    onInputChange,
    onPageSubmit,
}) {
    return (
        <div className="grid mx-auto justify-center items-center py-6 grid-flow-row">
            <form onSubmit={onPageSubmit}>
                <div>
                    <label
                        className="pr-3 text-sm font-semibold"
                        htmlFor="page-input"
                    >
                        Page {currentPage} of {totalPages} :
                    </label>

                    <input
                        className="font-light text-sm max-w-xl w-auto text-center border rounded px-2 py-1"
                        type="number"
                        id="page-input"
                        value={inputValue}
                        onChange={onInputChange}
                        min="1"
                        max={totalPages}
                    />
                </div>
            </form>
        </div>
    );
}
