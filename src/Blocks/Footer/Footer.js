import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.content}>
                <div className={styles.copy}>© 2024 Yorta</div>
                <div className={styles.links}>
                    <a href="/docs/offer.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>Оферта</a>
                    <a href="/docs/privacy_policy" target="_blank" rel="noopener noreferrer" className={styles.link}>Политика конфеденциальности</a>
                    <a className={styles.link}>О сервисе</a>
                </div>
            </div>
        </div>
    );
}
