import styles from "./Spinner.module.css";

const Spinner = ({ width = '50px', height = '50px', color = "#000", stroke = "2" }) => (
    <svg className={styles.spinner} viewBox="0 0 50 50" width={width} height={height}>
        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth={stroke} stroke={color}></circle>
    </svg>
);

export default Spinner;
