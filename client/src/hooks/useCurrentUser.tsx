import { useState, useEffect } from "react";
import { getUserDetialsApi } from "../api/userDetailApi";

interface UserDetails {
    firstName: string;
    specialty?: string;
}
/**
 * A custom React hook for fetching and managing user details.
 * 
 * @function useUserDetails
 * @returns {UserDetails | null} The user details if fetched successfully, otherwise `null`.
 * 
 * @example
 * const userDetails = useUserDetails();
 * 
 */
export const useUserDetils = () => {
    const [data, setData] = useState<UserDetails | null>(null);
    /**
     * Fetches user details from the API and updates the state.
     * Handles success and error cases appropriately.
     * 
     * @async
     * @function getUserDetail
     * @returns {Promise<void>} A promise that resolves when the user details are fetched and set.
     */
    const getUserDetail = async () => {
        try {
            const res = await getUserDetialsApi();
            if (res.success) {
                setData(res.data);
            } else {
                throw { res };
            }
        } catch (error) {
            // console.log(error);
            setData(null);
        }
    }
    useEffect(() => {
        getUserDetail();
    }, [])
    return data;
}