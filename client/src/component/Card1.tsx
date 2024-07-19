import React from 'react';
import { uploadPdfApi } from '../api/pdfApi';
import { useNavigate } from 'react-router-dom';

interface Card1Props {
    heading: string;
    content: string;
    buttonName: string;
    action: string;
    fn?: Function;
}




const Card1: React.FC<Card1Props> = ({ heading, content, buttonName, action, fn }) => {
    const navigate = useNavigate();
    function handleAction(action: string) {
        switch (action) {
            case 'uploadPdf':
                if (fn) {
                    fn();
                }
                break;
            case 'viewPdf':
                navigate('/dr/available-pdf');
                break;
            case 'avilablePatients':
                navigate('/dr/available-patient')
                break;
            case 'assignPatients':
                navigate('/dr/assigned-patient')
                break;
            default:
                break;
        }
    }
    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-[90%] md:w-96 sm:80  h-48 relative">
            <div className="text-2xl font-medium">{heading}</div>
            <div className='font-normal text-slate-500 mt-1'>{content}</div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 rounded-lg shadow-md bottom-4 right-4 absolute'
                onClick={() => handleAction(action)}>{buttonName}</button>
        </div>
    );
};

export default Card1;