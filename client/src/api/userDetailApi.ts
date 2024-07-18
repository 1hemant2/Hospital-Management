import { axiosInstances } from "./axiosInstanc";

export const getUserDetialsApi = async () => {
    try {
        const res = await axiosInstances.get('/user/detials');
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}  