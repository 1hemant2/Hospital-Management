import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginApi } from '../../api/doctorApi';
import Alert from '../../component/Alert';
import { useUserDetils } from '../../hooks/useCurrentUser';


interface LoginData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    });
    const user = useUserDetils();
    if (user?.specialty) {
        navigate('/dr');
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await loginApi(data);
            console.log(res);
            if (!res.success) {
                throw { message: res.message };
            } else {
                localStorage.setItem('token', res.token);
                navigate('/dr');
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
        <div className="flex justify-center items-center h-screen bg-blue p-4 sm:p-00">
            <Alert message={message} showAlert={showAlert}></Alert>
            <div className="border border-gray-300 bg-white rounded-lg shadow-lg sm:p-8 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6">
                <h2 className="text-2xl font-bold text-center">Doctor Login</h2>
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
                <div className='ml-8'>Don't have an account?<span className="ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/dr/register')}>Register</span></div>
            </div>
        </div>
    );
};

export default Login;
