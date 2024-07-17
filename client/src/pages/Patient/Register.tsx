import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../api/patientApi';
import Alert from '../../component/Alert'

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

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
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

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
            setMessage(error.message);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Alert message={message} showAlert={showAlert}></Alert>
            <form onSubmit={handleSubmit}>
                <div className='border border-gray-300 bg-white rounded-lg shadow-lg p-8 flex flex-col max-w-md w-full space-y-6'>
                    <h2 className="text-2xl font-bold text-center">Patient Sign-Up</h2>
                    <div className='flex space-x-4'>
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="First Name" name='firstName' onChange={handleChange} />
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Last Name" name='lastName' onChange={handleChange} />
                    </div>
                    <input type="email" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Email" name='email' onChange={handleChange} />
                    <input type="password" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Password" name='password' onChange={handleChange} />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>Register</button>
                    <div className='ml-2'>Already have account?<span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/pt/login')}>Login</span> </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
