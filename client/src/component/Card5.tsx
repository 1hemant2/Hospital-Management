import React from 'react';

interface Card5Props {
    name: string;
    email: string;
    icon: string;
}

const Card5: React.FC<Card5Props> = ({ icon, name, email }) => {
    return (
        <div className="p-2 border border-gray-300 shadow-xl rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto h-auto relative">
            <div className="flex border-b border-gray-300 p-3">
                <div className="h-8 w-8 mt-3" dangerouslySetInnerHTML={{ __html: icon }} />
                <div className="ml-4">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl">
                        {name}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                        {email}
                    </p>
                </div>
            </div>
            <div className="mt-2 p-3">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold">Your Assigned Doctor</p>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium mt-2">
                    {name.length > 0
                        ? `${name} is your primary care physician. You can contact her directly with any questions or concerns.`
                        : 'Dr will be available soon'}
                </p>
            </div>
        </div>
    );
};

export default Card5;
