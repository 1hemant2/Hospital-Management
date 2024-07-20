import React, { useState, useEffect } from 'react';
import SearchBar from '../../component/SearchBar';
import Card3 from '../../component/Card3';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';
import { assignedPatientsApi, searchAssignedPatientApi } from '../../api/doctorPatientApi';
import { useNavigate } from 'react-router-dom';

const AssignedPatient: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPage, setTotlaPage] = useState<number>(0);

    /**
     * Handles page change by updating the current page state.
     * 
     * @param {number} page - The new page number to be set.
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    /**
     * Fetches assigned patients for the current page and updates state.
     * Handles API errors and logs error messages.
     * 
     * @async
     * @function assignPatientsFn
     * @returns {Promise<void>} A promise that resolves when the patient data is fetched and set.
     */
    const assignPatientsFn = async () => {
        try {
            const res = await assignedPatientsApi(currentPage);
            if (res.success) {
                setData(res.data);
                setTotlaPage(res.totalPage)
            } else {
                throw res;
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
    /**
    * Searches for assigned patients based on the input value and updates state with search results.
    * 
    * @async
    * @function searchAssignPatient
    * @param {string} input - The search input value.
    * @returns {Promise<void>} A promise that resolves when the search results are fetched and set.
    */
    const searchAssignPatient = async (input: string) => {
        try {
            const res = await searchAssignedPatientApi(input);
            if (res.success) {
                setData(res.data);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        assignPatientsFn();
    }, [currentPage]);
    return (
        <div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 m-4 mt-6 rounded-md shadow-md '
                onClick={() => navigate('/dr')}>Back to Dashboard</button>
            <div className="flex justify-center sm:h-[560px]">
                <div className="md:max-w-4xl  flex flex-col items-center ">
                    <SearchBar placeholderValue="Search by patient email..." action='searchAssignPatients' fn={searchAssignPatient} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                        {
                            data?.map((d: any) => (
                                <>
                                    <Card3 email={d.patient.email} firstName={d.patient.firstName} lastName={d.patient.lastName} id={d.patient.id} />
                                </>
                            ))
                        }
                    </div>

                </div>
            </div>
            <div className='flex flex-col items-center'>
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

export default AssignedPatient;