import { axiosInstances } from "./axiosInstanc";

export const avilablePatientApi = async (page: number) => {
    try {
        const res = await axiosInstances.get(`/doctoPatient/unassignedPatients/${page}`);
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
        return error.response.data;
    }
}

export const assignedPatientsApi = async (page: number) => {
    try {
        const res = await axiosInstances.get(`/doctoPatient/assignedPatients/${page}`);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const unassignPatientApi = async (id: string) => {
    try {
        const res = await axiosInstances.delete(`/doctoPatient/removePatient`, {
            data: { patientId: id }
        });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const assignedDoctorApi = async () => {
    try {
        const res = await axiosInstances.get('/doctoPatient/assignedDoctor');
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const searchAssignedPatientApi = async (email: string) => {
    try {
        const data = await axiosInstances.get('/doctoPatient/searchassignedPatients', {
            params: { email }
        });
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}
export const searchAvailablePatientApi = async (email: string) => {
    try {
        const data = await axiosInstances.get('/doctoPatient/searchUnassignedPatients', {
            params: { email }
        });
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}

