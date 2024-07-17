import { axiosInstances } from "./axiosInstanc";

interface registerPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    specialty: string;
}

interface loginPayload {
    email: string,
    password: string
}
export const registerApi = async (payload: registerPayload) => {
    try {
        const res = await axiosInstances.post('/doctor/register', payload);
        return res.data;
    } catch (error: any) {
        // console.log(error);
        return error.response.data;
    }
}

export const loginApi = async (payload: loginPayload) => {
    try {
        const res = await axiosInstances.post('/doctor/login', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}
