import { useState, useRef, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./status.module.css";
import buttons from "Blocks/Form/buttons.module.css";

import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";
import Alert from "Blocks/Alert/Alert";

import { getPayment } from "Api";
import { formatAmount } from "utils";


const REQUEST_TIMEOUT = 5000;

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

        {(payment.status === 600 || payment.status === 400) && <div className={styles.footer}>
            <Link to="/" className={buttons.Button} type={payment.status === 600 ? "success" : "danger"}>
                👈 Повторить оплату
            </Link>
        </div>}

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

                    // Проверяем, является ли статус финальным прямо после получения ответа
                    if (response.status !== 600 && response.status !== 400) {
                        console.log(response.status)
                        // Если статус не финальный, планируем следующий запрос
                        timeoutID.current = setTimeout(fetchPaymentData, REQUEST_TIMEOUT);
                    } else {
                        // Если статус финальный, останавливаем индикацию загрузки
                        setFetching(false);
                    }
                } else {
                    setError("Ошибка — не вышло прочитать данные о платеже");
                    setFetching(false);
                }
            } catch (error) {
                setError("Ошибка — не удалось загрузить данные о платеже");
                setFetching(false);
            }
        };

        fetchPaymentData();

        // Очистка таймера при размонтировании компонента
        return () => {
            if (timeoutID.current) clearTimeout(timeoutID.current);
        };
    }, [id, navigate]); // Зависимости useEffect


    return (
        <div>
            <>
                <Page
                    title={`Платеж #${id}`}
                    subtitle={payment.status ? `От клиента ${payment.account} по заказу #${payment.orderId}` : ""}
                    type={fetching ? "pending" : (payment.status === 600 ? "success" : (payment.status === 400 ? "error" : "pending"))}>

                    <div className={styles.container}>
                        {error && <Alert message={error} type="danger" />}

                        {payment.status && <Order payment={payment} />}


                        {fetching && <div className={styles.preloader}>
                            <Preloader text="Проверяем данные о платеже..." size="small" />
                        </div>}

                        <div className={styles.help}>
                            <h3>Есть вопросы?</h3>
                            <div className={styles.item}>
                                <p>Оплата не прошла или есть вопросы по платежам? Ответим оперативно</p>
                                <a href="https://Yortakz.t.me" type="tg" target="_blank" rel="noopener noreferrer">
                                    В телеграм @Yortakz
                                </a>
                            </div>
                            <div className={styles.item}>
                                <p>Все другие вопросы по доставке и обслуживанию напиши</p>
                                <a href="mailto:infokz@amway.com " type="mail" target="_blank" rel="noopener noreferrer">
                                    На почту infokz@amway.com
                                </a>
                            </div>
                        </div>
                    </div>

                </Page>
            </>
        </div>
    );
}

export default Status;
