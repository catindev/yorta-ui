import styles from './button.module.css'; 

export default function PaymentButton({ currency = "₽", amount = "0.00", description = "...", type = "", children }) {
    return (
        <button className={styles.PaymentButton} type={type}>
            <div className={styles.icon}>{ children }</div>
            <div className={styles.text}>
                <div className={styles.amount}>{currency}{amount}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </button>
    );
};