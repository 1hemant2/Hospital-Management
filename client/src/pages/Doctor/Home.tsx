import { useEffect, useState } from 'react';
import Card1 from '../../component/Card1';
import Footer from '../../component/Footer';
import { useUserDetils } from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import { uploadPdfApi } from '../../api/pdfApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * A React functional component that represents the home page for a user, displaying user details,
 * available patients, assigned patients, and options to upload and view PDFs.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * );
 */
const Home: React.FC = () => {
    const navigate = useNavigate();
    const data = useUserDetils();

    if (data) {
        if (!data?.specialty) {
            navigate('/pt/login');
        }
    } else {
        navigate('/');
    }

    /**
     * Handles user logout by removing the token from local storage and navigating to the home page.
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }


    /**
    * Opens a file dialog for uploading PDFs and handles the file upload process.
    */
    const uploadPdfFn = () => {
        // console.log('upload Pdf');
        const input = document.createElement('input');
        input.type = 'file';

        input.accept = 'application/pdf';

        // Listen for file selection
        input.addEventListener('change', async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                toast.dark('uploading...., you will notify after uploaded', {
                    position: "top-center",
                });
                const res = await uploadPdfApi({ name: file.name, pdf: file });
                if (res.success) {
                    toast.success('file uploading successfully', {
                        position: "top-center",
                    });
                }
                console.log(res);
            }
        });

        // Trigger click event to open file dialog
        input.click();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, []);
    return (
        <div>
            <ToastContainer />
            <div className="">
                <div className="ml-5 mt-5 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-10 w-10"
                    >
                        <path d="M18 1C18 1.71561 17.9359 2.37948 17.8155 3H8.23193C8.41382 3.72694 8.69997 4.38283 9.08066 5H17.1807C16.132 7.31672 14.1871 8.99371 12 10.7267C8.72906 8.13494 6 5.66845 6 1H4C4 6.46624 7.21013 9.46355 10.3863 12C7.21013 14.5365 4 17.5338 4 23H6C6 18.0404 9.08011 15.566 12.6178 12.7863L12.7096 12.7142C16.149 10.0123 20 6.98705 20 1H18ZM17.8155 21.0002H8.23193C8.41382 20.2733 8.69997 19.6174 9.08066 19.0002H17.1807C16.3939 17.262 15.1026 15.8839 13.583 14.5721C14.1162 14.1516 14.6526 13.7351 15.1811 13.3086C17.7659 15.5981 20 18.44 20 23.0002H18C18 22.2846 17.9359 21.6207 17.8155 21.0002Z"></path>
                    </svg>
                    <div className='absolute top-8 right-4'>
                        <button className="bg-[#2b2a2a] text-white rounded-md shadow-md p-2" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className='flex flex-col items-center '>
                    <div className='sm:max-w-2xl md:max-w-4xl w-full  mt-4'>
                        <div className='text-4xl font-semibold sm:ml-0 ml-6'>Welcome, {data?.firstName}</div>
                        <p className='mt-5 font-medium text-slate-500 sm:ml-0 ml-6'>This is your personal portal to manage your patients and medical records. Here, you can view available patients, assign patients to your care, and upload important documents.</p>

                        <div className='grid grid-cols-1 sm:grid-cols-2 mt-16 gap-y-9  sm:p-0 pl-8'>
                            <Card1 heading='Available Patients' content='View and assign patients to your care.'
                                buttonName='View Patients'
                                action='avilablePatients'

                            ></Card1>
                            <Card1 heading='Assigned Patients' content='Manage the patients under your care.'
                                buttonName='View Patients'
                                action='assignPatients'

                            ></Card1>
                            <Card1 heading='Upload PDF' content='Add important medical documents to your records.'
                                buttonName='Upload PDF'
                                action='uploadPdf'
                                fn={uploadPdfFn}
                            ></Card1>
                            <Card1 heading='Avilable PDF' content='View and access all your uploaded medical documents.'
                                buttonName='View PDFs'
                                action='viewPdf'
                            ></Card1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 '>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;