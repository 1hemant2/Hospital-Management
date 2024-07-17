import axios from "axios";
import { baseUrl } from "./baseUrl";

function getToken() {
    return localStorage.getItem("token");
}

export const axiosInstances = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: `Bearer ${getToken()}`
    }
})