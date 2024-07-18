import { useState, useEffect } from "react";
import { getUserDetialsApi } from "../api/userDetailApi";

interface UserDetails {
    firstName: string;
    specialty?: string;
}
export const useUserDetils = () => {
    const [data, setData] = useState<UserDetails | null>(null);

    const getUserDetail = async () => {
        try {
            const res = await getUserDetialsApi();
            // console.log(res);
            if (res.success) {
                setData(res.data);
            } else {
                throw { res };
            }
        } catch (error) {
            setData(null);
        }
    }
    useEffect(() => {
        getUserDetail();
    }, [])
    return data;
}