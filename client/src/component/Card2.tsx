import React from 'react';

interface Card1Props {
    name: string;
    email: string;
}

const Card2: React.FC<Card1Props> = ({ name, email }) => {
    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-80  h-48 relative">
            <div className="text-2xl font-medium">{name}</div>
            <div className='font-normal text-slate-500 mt-1'>{email}</div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 pl-4 pr-4 rounded-lg shadow-md bottom-4 right-3 absolute '>Assign to Care</button>
        </div>
    );
};

export default Card2;