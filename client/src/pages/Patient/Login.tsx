import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg p-8 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Patient Login</h2>
                <div className='flex space-x-4'>
                </div>
                <input type="email" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Email" />
                <input type="password" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Password" />
                <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>Login</button>
            </div>
        </div>
    );
};

export default Login;
