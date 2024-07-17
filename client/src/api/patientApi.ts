import { axiosInstances } from "./axiosInstanc";

interface registerPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface loginPayload {
    email: string,
    password: string
}
export const registerApi = async (payload: registerPayload) => {
    try {
        const res = await axiosInstances.post('/patient/register', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const loginApi = async (payload: loginPayload) => {
    try {
        const res = await axiosInstances.post('/patient/login', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}
