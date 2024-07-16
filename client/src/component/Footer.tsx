import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='flex justify-between items-center p-4 border-t border-gray-500 '>
            <p>© 2024 Doctor's Portal. All rights reserved.</p>
            <div className='flex space-x-4'>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    );
};

export default Footer;
