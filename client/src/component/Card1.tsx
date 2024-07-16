import React from 'react';

interface Card1Props {
    heading: string;
    content: string;
    buttonName: string;
}

const Card1: React.FC<Card1Props> = ({ heading, content, buttonName }) => {
    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-80  h-48 relative">
            <div className="text-2xl font-medium">{heading}</div>
            <div className='font-normal text-slate-500 mt-1'>{content}</div>
            <button className='max-w-md bg-[#2b2a2a] text-white p-2 rounded-lg shadow-md bottom-4 absolute'>{buttonName}</button>
        </div>
    );
};

export default Card1;