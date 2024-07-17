import React from 'react';

interface Card5Props {
    heading: string;
    quote: string;
    icon: string;
}

const Card6: React.FC<Card5Props> = ({ icon, heading, quote }) => {
    return (
        <div className="p-7 border border-gray-300 shadow-xl rounded-lg w-full mx-auto h-52 relative ">
            <div className="flex    border-gray-300 p-4">
                <div className="h-12 w-12 mt-3" dangerouslySetInnerHTML={{ __html: icon }} />
                <div className="ml-4 flex justify-center items-center flex-col p-10">
                    <p className="heading font-bold text-xl ">
                        {heading}
                    </p>
                    <p className="mt-4 text-gray-700">
                        {quote}
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Card6;
