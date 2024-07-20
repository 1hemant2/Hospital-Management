import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetils } from '../hooks/useCurrentUser';


/**
 * Home component that serves as the landing page for the application.
 * It checks the current user's details and navigates to the appropriate
 * login page based on whether the user has a specialty or not.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */


const Home: React.FC = () => {
    const navigate = useNavigate();
    const user = useUserDetils();
    // console.log(user);
    if (user) {
        if (user.specialty) {
            navigate('/dr/login');
        } else {
            navigate('/pt/login');
        }
    }
    return (
        <div className="h-screen p-4 bg-blue flex justify-center items-center black-to-white">
            <div className="w-full h-auto pt-20 pb-20 pl-2 pr-2 border border-gray-300 shadow-lg bg-white flex flex-col items-center rounded-lg md:w-[50%] sm:w-[40%]">
                <div className='text-3xl sm:text-3xl md:text-5xl font-medium flex flex-col items-center space-y-2'>
                    <p >Welcome to our </p>
                    <p> Healthcare </p>
                    <p> Platform </p>
                </div>
                <p className='mt-7 text-lg text-gray-600 font-medium '>Please select your role to continue</p>
                <div className='p-8'>
                    <button className=' bg-[#2b2a2a] text-white pt-3 pb-3 pl-5 pr-5 min-w-full  mt-7 rounded-md shadow-md' onClick={() => navigate('/dr/login')}>Continue as Doctor</button>
                    <button className=' bg-[#464846] text-white pt-3 pb-3 pl-5 pr-5 mt-7 min-w-full rounded-md shadow-md' onClick={() => navigate('/pt/login')}>Continue as patient</button>
                </div>

            </div>
        </div>
    );
};

export default Home;
