import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../api/patientApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/**
 * Register component for patient sign-up.
 * 
 * @component
 * @returns {React.FC} React Functional Component
 * 
 * The Register component handles the user registration functionality for patients. It manages
 * the registration form state, handles form submission, and navigates the user based on the
 * registration response.
 */

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<RegisterData>(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    );

    /**
     * Handles input change events and updates the form data state.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
     */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    /**
     * Handles form submission, calls the register API, and manages navigation and error handling.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        try {
            const res = await registerApi(data);
            console.log(res);
            if (!res.success) {
                throw { message: res.message };
            } else {
                navigate('/pt/login');
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue p-4 sm:p-0">
            <ToastContainer />
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-8 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Patient Sign-Up</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <div className='flex space-x-4'>
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="First Name" name='firstName' onChange={handleChange} />
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Last Name" name='lastName' onChange={handleChange} />
                    </div>
                    <input
                        type="email"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Email"
                        name='email'
                        onChange={handleChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Please enter a valid email address."
                        required
                    />
                    <input
                        type="password"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Password "
                        name='password'
                        onChange={handleChange}
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        minLength={8}
                        title="Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number."
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>Register</button>
                </form>

                <div className='ml-8'>Already have account?<span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/pt/login')}>Login</span> </div>
            </div>
        </div>
    );
};

export default Register;
