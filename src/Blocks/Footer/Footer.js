import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.content}>
                <div className={styles.copy}>© 2024 Yorta</div>
                <div className={styles.links}>
                    <a href="/about" className={styles.link}>Оферта</a>
                    <a href="/services" className={styles.link}>Политика конфеденциальности</a>
                    <a href="/contact" className={styles.link}>О сервисе</a>
                </div>
            </div>
        </div>
    );
}
