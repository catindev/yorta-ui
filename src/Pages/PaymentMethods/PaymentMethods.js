import { useState, useRef, useEffect } from "react";

import styles from "./paymentMethods.module.css";

import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";

import PaymentButton from "Blocks/PaymentButton/PaymentButton";
import sbpIcon from "Blocks/PaymentButton/sbp.svg";
import cardIcon from "Blocks/PaymentButton/card.svg";

import Spinner from "Blocks/Spinner/Spinner";
import Alert from "Blocks/Alert/Alert";

import { check } from "Api";

function PaymentMethods() {
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
            } else setError(1);
        } catch (error) {
            console.log("error", error);
            setError(error.response.data.message);
        } finally {
            setFetching(false);
        }
    }

    return (
        <div>
            <>
                {/* <Preloader text="Pending status..." size="medium" /> */}
                <Page
                    title="Оплата заказа #837332907"
                    subtitle="Оплати казахстанской картой или через СБП в приложении своего банка">

                    <div className={styles.container}>
                        <Alert message="Оплата этим способом временно недоступна. Попробуйте позже" type="danger" />

                        <PaymentButton currency="₸" amount="100500" type="disabled"
                            description="Картой банка Казахстана">
                            {/* <img src={cardIcon} /> */}
                            <Spinner stroke="5" color="#fff" />
                        </PaymentButton>

                        <PaymentButton amount="100500" type="disabled"
                            description="QR-кодом любого банка РФ">
                            <img src={sbpIcon} />
                        </PaymentButton>
                    </div>

                </Page>
            </>
        </div>
    );
}

export default PaymentMethods;
