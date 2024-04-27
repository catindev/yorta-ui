import axios from 'axios';
import { BASE_URL } from "./config";

export const check = async ({ account, order_id, amount }) => {
    const data = { account, order_id, amount };
    const url = `${BASE_URL}/yurta/order`;
    const request = { method: 'put', url, data };
    try {
        const response = await axios(request);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// 1011 - ok
// 1015 - not ok
export const postPayment = async ({ id, pan, month, year, cvv }) => {
    const data = { id, payment_details: { pan, month, year, cvv } };
    const url = `${BASE_URL}/core/v1/public/payment_data`;
    const request = { method: 'post', url, data };
    try {
        const response = await axios(request);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getPayment = async (id) => {
    const url = `${BASE_URL}/core/v1/public/payment?id=${id}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}