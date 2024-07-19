import React, { useState, useEffect } from 'react';
import SearchBar from '../../component/SearchBar';
import Card3 from '../../component/Card3';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';
import { assignedPatientsApi } from '../../api/doctorPatientApi';
import { useNavigate } from 'react-router-dom';

const AssignedPatient: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPage, setTotlaPage] = useState<number>(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
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

    useEffect(() => {
        assignPatientsFn();
    }, [currentPage]);
    return (
        <div>
            <div className='flex-grow'>
                <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 m-4 mt-6 rounded-md shadow-md '
                    onClick={() => navigate('/dr')}>Back to Dashboard</button>
                <div className="flex justify-center">
                    <div className="md:max-w-4xl  flex flex-col items-center ">
                        <SearchBar placeholderValue="Search by patient email..." />
                        <div className="grid grid-cols-1 sm:grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                            {
                                data?.map((d: any) => (
                                    <>
                                        <Card3 email={d.patient.email} firstName={d.patient.firstName} lastName={d.patient.lastName} id={d.patient.id} />
                                    </>
                                ))
                            }
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default AssignedPatient;