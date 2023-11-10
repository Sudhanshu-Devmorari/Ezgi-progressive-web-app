import React, { useEffect } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";

const AxiosInstance = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const accessToken = cookies["access-token"];
    console.log("accessToken", accessToken)

    useEffect(() => {
        if (!accessToken) {
            localStorage.clear();
            window.location.reload();
        }
    }, [accessToken]);

    const axiosInstance = axios.create({
        headers: {
            'Authorization': `Token ${accessToken}`,
        },
    });

    return axiosInstance;
};

export default AxiosInstance;