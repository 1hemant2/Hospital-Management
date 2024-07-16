import React, { useState } from 'react';
import SearchBar from '../../component/SearchBar';
import Card4 from '../../component/Card4';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';


const AvailablePdf: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Set the total number of pages (example: 5 pages)

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 m-4 mt-6 rounded-md shadow-md'>Back to Dashboard</button>
            <div className="flex justify-center">
                <div className="max-w-2xl w-full flex flex-col items-center ">
                    <SearchBar placeholderValue="Search by pdf name..." />
                    <div className="grid grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                        <Card4 heading='patient1 report'></Card4>
                        <Card4 heading='patient2 report'></Card4>
                        <Card4 heading='patient3 report'></Card4>
                        <Card4 heading='patient4 report'></Card4>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <div className='mt-5'></div>
            <Footer></Footer>
        </div>
    );
};

export default AvailablePdf;