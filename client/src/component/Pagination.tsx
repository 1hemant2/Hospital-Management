import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                className={`p-2 ${currentPage === 1 ? 'text-gray-400' : 'text-gray-800'}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="p-2">Page {currentPage} of {totalPages}</span>
            <button
                className={`p-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-800'}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
