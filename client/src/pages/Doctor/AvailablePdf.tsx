import React, { useEffect, useState } from 'react';
import SearchBar from '../../component/SearchBar';
import Card4 from '../../component/Card4';
import Pagination from '../../component/Pagination';
import Footer from '../../component/Footer';
import { getPdfApi, searchPdfApi, totalPageApi } from '../../api/pdfApi';
import { useNavigate } from 'react-router-dom';


const AvailablePdf: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotlaPages] = useState<number>(0);
    const navigate = useNavigate()

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const getPdf = async () => {
        try {
            const res = await getPdfApi(currentPage);
            console.log(data);
            if (res.success) {
                setData(res.data);
            } else {
                throw { message: res.message };
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }
    const totalPageFn = async () => {
        try {
            const res = await totalPageApi();
            setTotlaPages(parseInt(res.data));
        } catch (error) {

        }

    }
    const searchPdfFn = async (input: string) => {
        try {
            const res = await searchPdfApi(input);
            console.log(res);
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
        <div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 m-4 mt-6 rounded-md shadow-md' onClick={() => navigate('/dr')}>Back to Dashboard</button>
            <div className="flex justify-center">
                <div className="md:max-w-4xl   flex flex-col items-center ">
                    <SearchBar placeholderValue="Search by pdf name..." action='searchPdf' fn={searchPdfFn} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-16 gap-y-5 gap-x-4 mb-6">
                        {
                            data?.map((datas: any) => (
                                <Card4 heading={datas.name} url={datas.filePath}></Card4>
                            ))
                        }

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