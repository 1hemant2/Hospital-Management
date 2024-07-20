import React, { useState, useEffect } from 'react';
import SearchBar from '../../component/SearchBar';
import Card2 from '../../component/Card2';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';
import { useNavigate } from 'react-router-dom';
import { avilablePatientApi, searchAvailablePatientApi } from '../../api/doctorPatientApi';

/**
 * A React functional component that displays a list of available patients with search and pagination functionalities.
 * 
 * @component
 * @example
 * return (
 *   <AvailablePatient />
 * );
 */
const AvailablePatient: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPage, setTotlaPage] = useState<number>(5);

    /**
    * Handles page change by updating the current page state.
    * 
    * @param {number} page - The new page number to be set.
    */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    /**
     * Fetches available patients for the current page and updates state.
     * Handles API errors but does not modify the state on failure.
     * 
     * @async
     * @function availabePatientsFn
     * @returns {Promise<void>} A promise that resolves when the patient data is fetched and set.
     */
    const availabePatientsFn = async () => {
        try {
            const res = await avilablePatientApi(currentPage);
            if (res.success) {
                setData(res.availablePatients);
                setTotlaPage(res.total)
            }
        } catch (error: any) {
        }
    }
    /**
     * Searches for available patients based on the input value and updates state with search results.
     * 
     * @async
     * @function searchAvailablePatient
     * @param {string} input - The search input value.
     * @returns {Promise<void>} A promise that resolves when the search results are fetched and set.
     */
    const searchAvailablePatient = async (input: string) => {
        try {
            const res = await searchAvailablePatientApi(input);
            if (res.success) {
                setData(res.availablePatients);
            }
            console.log(res);
        } catch (error) {

        }
    }

    useEffect(() => {
        availabePatientsFn();
    }, [currentPage]);

    return (
        <div>

            <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 m-4 mt-6 rounded-md shadow-md'
                onClick={() => navigate('/dr')}>Back to Dashboard</button>
            <div className="flex justify-center sm:h-[560px]">
                <div className="md:max-w-4xl sm:max-w-xl w-full flex flex-col items-center">
                    <SearchBar placeholderValue="Search by patient email..." action='searchAvailablePatients' fn={searchAvailablePatient} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                        {
                            data.map((d: any) => (
                                <Card2 email={d.email} firstName={d.firstName} lastName={d.lastName} id={d.id} key={d.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className='mt-auto'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default AvailablePatient;
