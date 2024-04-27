import { useState, useRef, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import styles from "./status.module.css";

import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";
import Alert from "Blocks/Alert/Alert";

import { getPayment } from "Api";
import { formatAmount } from "utils";


const getStatusText = status => {
    switch (status) {
        case 100:
            return "ожидает оплаты";
        case 200:
            return "оплачен. Переводим деньги на баланс";
        case 600:
            return "оплачен. Деньги переведены на баланс";
        case 400:
            return "не оплачен. Не удалось списать деньги";
        default:
            return "ожидает оплаты";
    }

}

const Order = ({ payment }) => (
    <>
        <div className={styles.line}></div>

        <div className={styles.amount}>
            ₽ {formatAmount(payment.processingCurrencyAmount)}
        </div>

        <div className={styles.localAmount}>
            ₸ {formatAmount(payment.amount)}
        </div>

        <div className={styles.status} type={payment.status}>
            Заказ {getStatusText(payment.status)}
        </div>

        <div className={styles.line}></div>
    </>
);


function Status() {
    const timeoutID = useRef(null);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [payment, setPayment] = useState({});
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }

        document.title = "Платёж #" + id;

        const fetchPaymentData = async () => {
            try {
                const response = await getPayment(id);
                if (response.status) {
                    setPayment(response);
                    setFetching(false);
                } else {
                    setError("Ошибка — не вышло прочитать данные о платеже");
                    setFetching(false);
                }

            } catch (error) {
                setError("Ошибка — не удалось загрузить данные о платеже");
                setFetching(false)
            }
        };

        fetchPaymentData();


    }, [id, navigate]);

    return (
        <div>
            <>
                <Page
                    title={`Платеж #${id}`}
                    subtitle={payment.status ? `От клиента ${payment.account} по заказу #${payment.orderId}` : ""}
                    type={fetching ? "pending" : (payment.status === 600 ? "success" : "error")}>

                    <div className={styles.container}>
                        {error && <Alert message={error} type="danger" />}

                        {payment.status && <Order payment={payment}/>}


                        {fetching && <div className={styles.preloader}>
                            <Preloader text="Загружаем данные об оплате..." size="medium" />
                        </div>}
                    </div>

                </Page>
            </>
        </div>
    );
}

export default Status;
