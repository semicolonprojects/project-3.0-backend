// components/PaginationWithInput.jsx
'use client';

import { useState, useEffect } from 'react';

const PaginationTest = () => {
    const [resis, setResis] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [inputValue, setInputValue] = useState(1);

       useEffect(() => {
           const fetchResis = async () => {
               try {
                   const combineResi = await getResiData(currentPage);
                   setResis(combineResi.data);
                   setTotalPages(combineResi.last_page);
               } catch (error) {
                   throw error;
               }
           };
           fetchResis();
       }, [currentPage]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePageChange = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(inputValue, 10);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        } else {
            alert(`Please enter a page number between 1 and ${totalPages}`);
        }
    };

    return (
        <div>
            <h1>Resi</h1>
            <ul>
                {resis.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>

            <div style={{ marginTop: '20px' }}>
                <form onSubmit={handlePageChange}>
                    <label htmlFor="page-input">Page {currentPage} of {totalPages}: </label>
                    <input
                        type="number"
                        id="page-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        min="1"
                        max={totalPages}
                    />
                    <button type="submit">Go</button>
                </form>
            </div>
        </div>
    );
};

export default PaginationTest;
