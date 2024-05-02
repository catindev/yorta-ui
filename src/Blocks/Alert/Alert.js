import React from "react";
import styles from "./Alert.module.css";

const Alert = ({ title, message, type = "", systemMessage = null }) => {
    return ( 
        <div className={[styles.Alert, styles[type]].join(" ")}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.message}>{message}</div>
            { systemMessage !== null && <div className={styles.message}>{JSON.stringify(systemMessage)}</div> }
        </div>
    );
};

export default Alert;

/*  Example:
    <Alert title="Title" message="message text" type="danger"/>    
*/