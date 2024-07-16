import React, { useState } from 'react';
import SearchBar from '../../component/SearchBar';
import Card3 from '../../component/Card3';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';

const AssignedPatient: React.FC = () => {
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
                    <SearchBar placeholderValue="Search by patient email..." />
                    <div className="grid grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                        <Card3 name='roni' email='roni@gmail.com' />
                        <Card3 name='roni' email='roni@gmail.com' />
                        <Card3 name='roni' email='roni@gmail.com' />
                        <Card3 name='roni' email='roni@gmail.com' />
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

export default AssignedPatient;