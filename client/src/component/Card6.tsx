import React from 'react';

interface Card6Props {
    heading: string;
    quote: string;
    icon: string;
}

const Card6: React.FC<Card6Props> = ({ icon, heading, quote }) => {
    return (
        <div className="p-4 sm:p-7 border border-gray-300 shadow-xl rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto h-auto relative">
            <div className="flex items-center border-gray-300 p-4">
                <div className="h-12 w-12" dangerouslySetInnerHTML={{ __html: icon }} />
                <div className="ml-4 flex-1">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl">{heading}</p>
                    <p className="text-gray-700 mt-2 sm:mt-4">{quote}</p>
                </div>
            </div>
        </div>
    );
};

export default Card6;
