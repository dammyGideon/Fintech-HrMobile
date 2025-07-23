//AuthService.js
import axios from "axios";

const BASE_URL = 'https://backend.jompstart.com';

export const LoginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/user-login`,
            JSON.stringify(credentials),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log('AuthService login error:', error);
        throw error;
    }
};

export const fetchCustomerById = async (customerId, token) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/get-customer?customerId=${customerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log('Fetch customer error:', error);
        throw error;
    }
};

export const getWalletByUserId = async (userId, token) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/wallet/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    }catch(error){
        console.log('Fetch customer wallet error',error)
        throw error;
    }
}
