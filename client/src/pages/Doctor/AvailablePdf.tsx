import React, { useEffect, useState } from 'react';
import SearchBar from '../../component/SearchBar';
import Card4 from '../../component/Card4';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';
import { getPdfApi, searchPdfApi, totalPageApi } from '../../api/pdfApi';
import { useNavigate } from 'react-router-dom';


/**
 * A React functional component that displays a list of available PDFs with search and pagination functionalities.
 * 
 * @component
 * @example
 * return (
 *   <AvailablePdf />
 * );
 */

const AvailablePdf: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotlaPages] = useState<number>(0);
    const navigate = useNavigate()

    /**
     * Handles page change by updating the current page state.
     * 
     * @param {number} page - The new page number to be set.
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    /**
    * Fetches PDFs for the current page and updates state.
    * Handles API errors but does not modify the state on failure.
    * 
    * @async
    * @function getPdf
    * @returns {Promise<void>} A promise that resolves when the PDF data is fetched and set.
    */
    const getPdf = async () => {
        try {
            const res = await getPdfApi(currentPage);
            if (res.success) {
                setData(res.data);
            } else {
                throw { message: res.message };
            }
        } catch (error: any) {
            // console.log(error.message);
        }
    }
    /**
    * Fetches the total number of pages for the PDFs and updates state.
    * 
    * @async
    * @function totalPageFn
    * @returns {Promise<void>} A promise that resolves when the total pages are fetched and set.
    */
    const totalPageFn = async () => {
        try {
            const res = await totalPageApi();
            setTotlaPages(parseInt(res.data));
        } catch (error) {

        }

    }
    /**
     * Searches for PDFs based on the input value and updates state with search results.
     * 
     * @async
     * @function searchPdfFn
     * @param {string} input - The search input value.
     * @returns {Promise<void>} A promise that resolves when the search results are fetched and set.
     */
    const searchPdfFn = async (input: string) => {
        try {
            const res = await searchPdfApi(input);
            if (res.success) {
                setData(res.data);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getPdf();
    }, [currentPage]);
    useEffect(() => {
        totalPageFn();
    }, [])


    return (
        <div className="">
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 m-4 mt-6 rounded-md shadow-md' onClick={() => navigate('/dr')}>Back to Dashboard</button>
            <div className="flex justify-center sm:h-[560px]">
                <div className="md:max-w-4xl   flex flex-col items-center ">
                    <SearchBar placeholderValue="Search by pdf name..." action='searchPdf' fn={searchPdfFn} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                        {
                            data?.map((datas: any) => (
                                <Card4 heading={datas.name} url={datas.filePath}></Card4>
                            ))
                        }

                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className='mt-auto'>
                <Footer></Footer>
            </div>
        </div>

    );
};

export default AvailablePdf;