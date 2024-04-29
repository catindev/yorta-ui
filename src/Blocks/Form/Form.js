import { useState, useRef, useEffect } from "react";
import styles from "./form.module.css";
import buttons from "./buttons.module.css";
import Spinner from "Blocks/Spinner/Spinner";

export default function Form({ onSubmit = () => { }, disabled = false }) {
    // 7020672426 837332907
    const [account, setAccount] = useState("");
    const [order, setОrder] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit({ account, order, amount });
    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handleSubmit} disabled={disabled}>
                <div className={styles.field}>
                    <label htmlFor="account">Номер клиента</label>
                    <input type="number" id="account" value={account}
                        onChange={e => setAccount(e.target.value)} required disabled={disabled} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="order">Номер заказа</label>
                    <input type="number" id="order" value={order}
                        onChange={e => setОrder(e.target.value)} required disabled={disabled} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="amount">Сумма оплаты в тенге</label>
                    <input type="number" id="amount" value={amount} min="5"
                        onChange={e => setAmount(e.target.value)} required disabled={disabled} />
                </div>

                <div className={styles.footer}>
                    <button className={buttons.Button} type="submit" disabled={disabled}>
                        {disabled && <Spinner width="20" height="20" stroke="5" color="#fff" />}
                        {disabled ? "Проверяем заказ.." : "Подтвердить заказ"}
                    </button>
                </div>
            </form>
        </div>
    );
}
