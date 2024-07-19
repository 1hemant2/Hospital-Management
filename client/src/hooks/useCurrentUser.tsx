import { useState, useEffect } from "react";
import { getUserDetialsApi } from "../api/userDetailApi";
import { useNavigate } from "react-router-dom";

interface UserDetails {
    firstName: string;
    specialty?: string;
}
export const useUserDetils = () => {
    const [data, setData] = useState<UserDetails | null>(null);
    const navigate = useNavigate();
    const getUserDetail = async () => {
        try {
            const res = await getUserDetialsApi();
            // console.log(res);
            if (res.success) {

                setData(res.data);

            } else {
                navigate('/');
                throw { res };
            }
        } catch (error) {
            console.log(error);
            setData(null);
        }
    }
    useEffect(() => {
        getUserDetail();
    }, [])
    return data;
}