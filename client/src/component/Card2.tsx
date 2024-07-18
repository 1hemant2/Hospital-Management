import React, { useState } from 'react';
import { assignPatientApi } from '../api/doctorPatientApi';

interface Card1Props {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}

const Card2: React.FC<Card1Props> = ({ firstName, lastName, email, id }) => {
    const [buttonText, setButtonText] = useState("Assign to Care");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const assignToCare = async (id: string) => {
        try {
            const res = await assignPatientApi(id);
            if (res.success) {
                setButtonText("Assigned");
                setButtonDisabled(true);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-80 h-48 relative">
            <div className="text-2xl font-medium">{firstName + " " + lastName}</div>
            <div className='font-normal text-slate-500 mt-1'>{email}</div>
            <button
                className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 rounded-lg shadow-md bottom-4 right-3 absolute'
                onClick={() => assignToCare(id)}
                disabled={buttonDisabled}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default Card2;
