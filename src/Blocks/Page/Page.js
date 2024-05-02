import styles from "./Page.module.css";
import Image from "./Image/Image";
import Header from "./Header/Header";

export default function Page({ title = "...", subtitle = "", type = "default", children }) {
    return (
        <div className={styles.Page}>
            <div className={styles.block}>
                <Header title={title} subtitle={subtitle}/>
                <div>
                    {children}
                </div>
            </div>
            <div className={[styles.block, styles.autohide].join(' ')}>
                <Image type={type}/>
            </div>
        </div>
    );
}