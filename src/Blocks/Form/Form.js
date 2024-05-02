import { useState } from "react";
import styles from "./Form.module.css";
import buttons from "./Buttons.module.css";
import Spinner from "Blocks/Spinner/Spinner";

const InputField = ({ id, label, value, setValue, disabled }) => (
    <div className={styles.field}>
        <label htmlFor={id}>{label}</label>
        <input type="number" id={id} value={value}
            onChange={e => setValue(e.target.value)} required disabled={disabled} />
    </div>
);

// Test account 7020672426 
// Test order 837332907
export default function Form({ onSubmit = () => {}, disabled = false }) {
    const [formData, setFormData] = useState({
        account: "",
        order: "",
        amount: ""
    });

    const handleChange = (field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <div>
            <form className={styles.Form} onSubmit={handleSubmit} disabled={disabled}>
                <InputField id="account" label="Номер клиента" value={formData.account}
                    setValue={handleChange('account')} disabled={disabled} />
                <InputField id="order" label="Номер заказа" value={formData.order}
                    setValue={handleChange('order')} disabled={disabled} />
                <InputField id="amount" label="Сумма оплаты в тенге" value={formData.amount}
                    setValue={handleChange('amount')} disabled={disabled} />

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
