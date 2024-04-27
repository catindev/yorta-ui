import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./checkOrder.module.css";

import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";
import Form from "Blocks/Form/Form";
import Alert from "Blocks/Alert/Alert";

import { check } from "Api";
import { usePayment } from "PaymentContext";

function CheckOrder() {
    const navigate = useNavigate();
    const { dispatch } = usePayment();
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(false);

    //TODO: унести логику в форму
    const handleSubmit = async ({ account, order, amount }) => {
        setError(false);
        setFetching(true);
        console.log("formdata", { account, order, amount });

        try {
            const response = await check({ account, order_id: order, amount });
            console.log(response)
            if (response.message && response.payment_methods) {
                // localStorage.setItem('appToken', response.token);
                // window.location.href = "/profile";

                if (response.message && response.payment_methods) {
                    dispatch({
                        type: 'SET_PAYMENT_DATA',
                        payload: { account, order, amount, paymentMethods: response.payment_methods }
                    });
                    navigate('/payment');
                } else {
                    setError("Произошла ошибка 😱");
                }
            } else setError(1);
        } catch (error) {
            console.log("error", error);
            setError(error.response ? error.response.data.message : "Произошла ошибка 😱");
        } finally {
            setFetching(false);
        }
    }

    return (
        <div>
            <>
                <Page
                    title="Оплачивай заказы не выходя из дома"
                    subtitle="Введи данные по своему заказу и заплати банковской картой или QR-кодом">
                    {error && <div className={styles.container}>
                        <Alert message={error} type="danger" />
                    </div>}
                    <Form onSubmit={handleSubmit} disabled={fetching} />
                </Page>
            </>
        </div>
    );
}

export default CheckOrder;
