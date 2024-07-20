import React, { useState } from 'react';
import { registerApi } from '../../api/doctorApi';
import { useNavigate } from 'react-router-dom';
import Alert from '../../component/Alert';

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    specialty: string;
}

/**
 * Register component for doctors.
 * @returns {JSX.Element} The rendered Register component.
 */
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState<RegisterData>(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            specialty: ''
        }
    );

    /**
    * Handles input change and updates the state.
    * @param {React.ChangeEvent<HTMLInputElement>} e - The change event of the input.
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    /**
     * Handles form submission and registration process.
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await registerApi(data);
            if (!res.success) {
                throw { message: res.message };
            } else {
                navigate('/dr/login');
            }
        } catch (error: any) {
            setMessage(error.message);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue p-4 sm:p-0">
            <Alert message={message} showAlert={showAlert}></Alert>
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-8 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Doctor Sign-Up</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <div className='flex space-x-4'>
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="First Name" name='firstName' onChange={handleChange} />
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Last Name" name='lastName' onChange={handleChange} />
                    </div>
                    <input type="email" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Email" name='email' onChange={handleChange} />
                    <input type="password" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Password" name='password' onChange={handleChange} />
                    <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Specialty" name='specialty' onChange={handleChange} />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 '>Register</button>
                </form>
                <div className='ml-8'>Already have account?<span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/dr/login')}>Login</span> </div>
            </div>
        </div>
    );
};

export default Register;
