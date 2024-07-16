import React from 'react';
import Card1 from '../../component/Card1';
import Footer from '../../component/Footer';

const Home: React.FC = () => {
    return (
        <div>
            <div className='flex flex-col items-center '>
                <div className='max-w-2xl   mt-20'>
                    <div className='text-4xl font-semibold'>Welcome, Doctor!</div>
                    <p className='mt-5 font-medium text-slate-500'>This is your personal portal to manage your patients and medical records. Here, you can view available patients, assign patients to your care, and upload important documents.</p>
                    <div className='grid grid-cols-2 mt-16 gap-y-5 '>
                        <Card1 heading='Available Patients' content='View and assign patients to your care.'
                            buttonName='View Patients'
                        ></Card1>
                        <Card1 heading='Assigned Patients' content='Manage the patients under your care.'
                            buttonName='View Patients'
                        ></Card1>
                        <Card1 heading='Upload PDF' content='Add important medical documents to your records.'
                            buttonName='Upload PDF'
                        ></Card1>
                        <Card1 heading='Avilable PDF' content='View and access all your uploaded medical documents.'
                            buttonName='View PDFs'
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