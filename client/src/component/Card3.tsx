import React from 'react';
import { unassignPatientApi } from '../api/doctorPatientApi';
import { useState } from 'react';

interface Card1Props {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}

const Card3: React.FC<Card1Props> = ({ firstName, lastName, email, id }) => {
    const [buttonText, setButtonText] = useState("unassign");
    const [divDisabled, setDivDisabled] = useState(false);

    const assignToCare = async (id: string) => {
        try {
            const res = await unassignPatientApi(id);
            if (res.success) {
                setButtonText("deleted");
                setDivDisabled(true);
            }
        } catch (error: any) {
            // console.log(error.message);
        }
    };

    return (
        <div className={`p-4 border border-gray-300 shadow-xl rounded-lg w-64 md:w-96 sm:80 h-48 relative ${divDisabled ? 'hidden' : ''}`}>
            <div className="text-xl sm:text-2xl font-medium">{firstName + " " + lastName}</div>
            <div className='text-sm sm:text-base font-normal text-gray-500 mt-1'>{email}</div>
            <button className='max-w-md bg-[#514848] text-white p-2 pl-4 pr-4 rounded-lg shadow-md bottom-4 right-3 absolute '
                onClick={() => assignToCare(id)}
            >{buttonText}</button>
        </div>
    );
};

export default Card3;
