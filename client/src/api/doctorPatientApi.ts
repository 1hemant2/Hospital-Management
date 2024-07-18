import { axiosInstances } from "./axiosInstanc";

export const avilablePatientApi = async (page: number) => {
    try {
        const res = await axiosInstances.get(`/doctoPatient/unassignedPatients/${page}`);
        console.log(res.data);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const assignPatientApi = async (id: string) => {
    try {
        const res = await axiosInstances.post(`/doctoPatient/assignPatient`, { patientId: id });
        return res.data;
    } catch (error: any) {
        // console.log(error);
        return error.response.data;
    }
}