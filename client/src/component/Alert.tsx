import React, { useState, useEffect } from 'react';

interface AlertProps {
    message: string;
    type?: string;
    showAlert: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'error', showAlert }) => {
    const [visible, setVisible] = useState(showAlert);

    useEffect(() => {
        if (showAlert) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <>
            {visible && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center ${type === 'error' ? "bg-red-500" : "bg-green-500"} text-white p-4 rounded shadow-lg`}>
                    {message}
                </div>
            )}
        </>
    );
};

export default Alert;
