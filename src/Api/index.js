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

export const postPayment = async ({ account, order_id, amount, payment_method }) => {
    const data = { account, order_id, amount, payment_method };
    const url = `${BASE_URL}/yurta/order`;
    const request = { method: 'post', url, data };
    try {
        const response = await axios(request);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// Статусы:
// 400 финальный неуспех
// 600 финальный успех 
// 100 ожидает оплаты
// 200 оплата получена ожидает успеха от выплатного процессинга

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