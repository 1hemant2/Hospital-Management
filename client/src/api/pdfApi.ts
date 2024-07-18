import { axiosInstances } from "./axiosInstanc"
interface upladPdfPayload {
    name: string;
    pdf: File
}
export const uploadPdfApi = async (payload: upladPdfPayload) => {
    try {
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('pdf', payload.pdf);
        const res = await axiosInstances.post('/pdf/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const getPdfApi = async (page: number) => {
    try {
        const data = await axiosInstances.get(`/pdf/upload/${page}`);
        return data.data;
    } catch (error) {
        return error;
    }
}


export const totalPageApi = async () => {
    try {
        const data = await axiosInstances.get(`/pdf/page`);
        return data.data;
    } catch (error) {
        return error;
    }
}