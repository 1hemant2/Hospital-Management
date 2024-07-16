import React from 'react';

interface Card4Props {
    heading: string;
}

const Card4: React.FC<Card4Props> = ({ heading }) => {
    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-80 h-48 relative">
            <div className="text-xl font-medium">{heading}</div>
            <div className='h-28 w-28'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b6a6a" className="text-gray-600">
                    <path d="M3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.5 7.5H12.5C12.5 9.98994 14.6436 12.6604 17.3162 13.5513L16.8586 15.49C13.7234 15.0421 10.4821 16.3804 7.5547 18.3321L6.3753 16.7191C7.46149 15.8502 8.50293 14.3757 9.27499 12.6534C10.0443 10.9373 10.5 9.07749 10.5 7.5ZM11.1 13.4716C11.3673 12.8752 11.6043 12.2563 11.8037 11.6285C12.2754 12.3531 12.8553 13.0182 13.5102 13.5953C12.5284 13.7711 11.5666 14.0596 10.6353 14.4276C10.8 14.1143 10.9551 13.7948 11.1 13.4716Z"></path>
                </svg>
            </div>

            <button className='max-w-md bg-[#2b2a2a] text-white p-2 rounded-lg shadow-md bottom-4 absolute right-4'>Download</button>
        </div>
    );
};

export default Card4;
