import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginApi } from '../../api/patientApi';
import { useUserDetils } from '../../hooks/useCurrentUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface LoginData {
    email: string;
    password: string;
}


/**
 * Login component for patient authentication.
 * 
 * @component
 * @returns {React.FC} React Functional Component
 * 
 * The Login component handles the user login functionality for patients. It manages
 * the login form state, handles form submission, and navigates the user based on the login
 * response. If the user is already logged in and lacks a specialty, they are redirected to
 * a specific route.
 */
const Login: React.FC = () => {
    const navigate = useNavigate();
    const user = useUserDetils();
    // console.log(user);
    if (user) {
        if (!user.specialty) {
            navigate('/pt');
        }
    }
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    });


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
     * Handles form submission, calls the login API, and manages navigation and error handling.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await loginApi(data);
            console.log(res);
            if (!res.success) {
                throw { message: res.message };
            } else {
                localStorage.setItem('token', res.token);
                navigate('/pt');
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
            <div className="border border-gray-300 bg-white rounded-lg shadow-lg sm:p-8 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6  ">
                <h2 className="text-2xl font-bold text-center">Patient Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-4">
                    <input
                        type="email"
                        name="email"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700"
                    >
                        Login
                    </button>
                </form>
                <div className='ml-8'>Don't have an account?<span className="ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/pt/register')}>Register</span></div>
            </div>
        </div>
    );
};

export default Login;
