import styles from './button.module.css'; 

export default function PaymentButton({ currency = "₽", amount = "0.00", description = "...", type = "", onClick, children }) {
    return (
        <button className={styles.PaymentButton} type={type} onClick={onClick}>
            <div className={styles.icon}>{ children }</div>
            <div className={styles.text}>
                <div className={styles.amount}>{currency}{amount}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </button>
    );
};