import styles from "./Header.module.css";

export default function Header({ title, subtitle }) {
    return (
        <div className={styles.Header}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    );
}