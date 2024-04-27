import styles from './button.module.css';
import rub from "./rub.svg"; 
import kzt from "./kzt.svg"; 

const icons = {
    "KZT": kzt,
    "RUB": rub
}

const texts = {
    "KZT": "картой казахстанского банка",
    "RUB": "QR-кодом любого банка РФ"
}

export default function PaymentButton({ currency = "RUB", amount = "0.00", description = "...", type = "", onClick, children }) {
    return (
        <button className={styles.PaymentButton} type={type} onClick={onClick}>
            <div className={styles.icon}>{ children }</div>
            <div className={styles.text}>
                <div className={styles.amount}><img src={icons[currency]}/> {amount}</div>
                <div className={styles.description}>{texts[currency]}</div>
            </div>
        </button>
    );
};