import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./paymentMethods.module.css";

import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";

import PaymentButton from "Blocks/PaymentButton/PaymentButton";
import sbpIcon from "Blocks/PaymentButton/sbp.svg";
import cardIcon from "Blocks/PaymentButton/card.svg";

import Spinner from "Blocks/Spinner/Spinner";
import Alert from "Blocks/Alert/Alert";

import { postPayment } from "Api";
import { usePayment } from "PaymentContext";
import formatAmount from "./formatAmount.util";
import fakeCardRequest from "./fakeCardRequest.util";

const colors = {
    1: "rgba(228, 149, 31, 1)",
    2: "rgba(86, 162, 173, 1)"
}

function PaymentMethods() {
    const navigate = useNavigate();
    const { state } = usePayment();
    
    const { account, order, amount, paymentMethods } = state;
    const [fetching, setFetching] = useState(false);
    const [color, setColor] = useState(false);
    const [error, setError] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);    
    const [disabledMethods, setDisabledMethods] = useState([]); 

    useEffect(() => {
        if (!account || !order || !amount || !paymentMethods || paymentMethods.length === 0) {
            navigate('/');
        }
    }, [account, order, amount, paymentMethods, navigate]); 


    const handlePayment = async method => {
        if (disabledMethods.includes(method.id)) return;
        setError(false);

        setColor(colors[method.id]);
        setFetching(true);
        
        if (method.id === 2) { // Заглушка для тенге
            fakeCardRequest(() => {
                setError((`Оплата ${method.description} временно недоступна. Попробуйте другой способ оплаты`).toUpperCase());
                setFetching(false);
                setDisabledMethods(prev => [...prev, method.id]);
            });
        } else {
            try {
                const response = await postPayment({ 
                    account, order_id: order, amount: amount * 100, payment_method: method.id 
                });
                
                if (response.id && response.redirect_url) {
                    window.location.href = response.redirect_url;
                } else {
                    setError("Платежная страница сломалась 🤒");
                    setFetching(false);
                }

            } catch (error) {
                setError(
                    (error.response && error.response.data.message) ? 
                        error.response.data.message 
                        : 
                        "Произошла неизвестная ошибка 😱"
                );
                setFetching(false);
            } 
        }
    };

    return (
        <div>
            <>
                <Page
                    title={`Оплата заказа #${order}`}
                    subtitle={`Клиент ${account}, оплати заказ казахстанской картой или через СБП в приложении своего банка`}>

                    <div className={styles.container}>
                        { error && <Alert message={error} type="danger" /> }

                        { fetching && <div className={styles.preloader}>
                            <Preloader text="Создаем страницу для оплаты..." size="medium" color={color}/>
                        </div> }

                        {!fetching && paymentMethods.map(method => (
                            <PaymentButton
                                key={method.id}
                                currency={method.currency === "KZT" ? "₸" : "₽"}
                                amount={formatAmount(method.amount)}
                                type={disabledMethods.includes(method.id) ? "disabled" : (method.name === "Visa/Mc" ? "card" : "sbp")}
                                description={method.description}
                                onClick={() => handlePayment(method)}>
                                <img src={method.name === "Visa/Mc" ? cardIcon : sbpIcon} alt={method.name} />
                            </PaymentButton>
                        ))}
                    </div>

                </Page>
            </>
        </div>
    );
}

export default PaymentMethods;
