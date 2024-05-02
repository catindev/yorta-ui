import styles from "./Content.module.css";

export default function Content({ children }) {
    return (
        <div className={styles.Content}>
                {children}
        </div>
    );
}