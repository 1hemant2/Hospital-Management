import React from 'react';
import { uploadPdfApi } from '../api/pdfApi';
import { useNavigate } from 'react-router-dom';

interface Card1Props {
    heading: string;
    content: string;
    buttonName: string;
    action: string;
}

const uploadPdfFn = () => {
    // console.log('upload Pdf');
    const input = document.createElement('input');
    input.type = 'file';

    // Set accept attribute to only allow PDF files
    input.accept = 'application/pdf';

    // Listen for file selection
    input.addEventListener('change', async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            console.log('Selected file:', file.name);
            const res = await uploadPdfApi({ name: file.name, pdf: file });
            // console.log(res);
            // Here you can perform further actions with the selected file
        }
    });

    // Trigger click event to open file dialog
    input.click();
}


const Card1: React.FC<Card1Props> = ({ heading, content, buttonName, action }) => {
    const navigate = useNavigate();
    function handleAction(action: string) {
        switch (action) {
            case 'uploadPdf':
                uploadPdfFn();
                break;
            case 'viewPdf':
                navigate('/dr/available-pdf');
                break;
            default:
                break;
        }
    }
    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-80  h-48 relative">
            <div className="text-2xl font-medium">{heading}</div>
            <div className='font-normal text-slate-500 mt-1'>{content}</div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 rounded-lg shadow-md bottom-4 absolute'
                onClick={() => handleAction(action)}>{buttonName}</button>
        </div>
    );
};

export default Card1;