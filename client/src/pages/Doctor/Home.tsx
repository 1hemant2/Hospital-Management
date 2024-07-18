import Card1 from '../../component/Card1';
import Footer from '../../component/Footer';
import { useUserDetils } from '../../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const data = useUserDetils();
    if (!data) {
        navigate('/dr/login');
    } else if (!data?.specialty) {
        navigate('/pt/login');
    }

    return (
        <div>
            <div className='flex flex-col items-center '>
                <div className='max-w-2xl   mt-20'>
                    <div className='text-4xl font-semibold'>Welcome, {data?.firstName}</div>
                    <p className='mt-5 font-medium text-slate-500'>This is your personal portal to manage your patients and medical records. Here, you can view available patients, assign patients to your care, and upload important documents.</p>
                    <div className='grid grid-cols-2 mt-16 gap-y-5 '>
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
                        ></Card1>
                        <Card1 heading='Avilable PDF' content='View and access all your uploaded medical documents.'
                            buttonName='View PDFs'
                            action='viewPdf'
                        ></Card1>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;