import React from 'react';

interface Card5Props {
    name: string;
    email: string;
    icon: string;
}

const Card5: React.FC<Card5Props> = ({ icon, name, email }) => {
    return (
        <div className="p-2 border border-gray-300 shadow-xl rounded-lg w-full mx-auto h-52 relative ">
            <div className="flex   border-b border-gray-300 p-3">
                <div className="h-8 w-8 mt-3" dangerouslySetInnerHTML={{ __html: icon }} />
                <div className="ml-4">
                    <p className="heading font-bold text-xl ">
                        {name}
                    </p>
                    <p className="quote text-gray-700">
                        {email}
                    </p>
                </div>
            </div>
            <div className='mt-2 p-3'>
                <p className="text-xl font-semibold ">Your Assigned Doctor</p>
                <p className='text-gray-500 font-medium mt-2'>{name} is your primary care physician. You can contact her directly with any questions or concerns.</p>
            </div>


        </div>
    );
};

export default Card5;
