import styles from "./preloader.module.css";
import Spinner from "../Spinner/Spinner";

const sizes = {
    "small": {
        width: "25", height: "25", stroke: "5", font: { fontSize: "1em" }
    },
    "medium": {
        width: "50", height: "50", stroke: "4", font: { fontSize: "1.25em" }
    },
    "large": {
        width: "100", height: "100", stroke: "2", font: { fontSize: "2em" }
    }
};

export default function Preloader({ text = "loading..", size = "small" }) {
    return (
        <div className={styles.Preloader}>
            <div className={styles.icon}>
                <Spinner
                    width={sizes[size].width}
                    height={sizes[size].height}
                    stroke={sizes[size].stroke}
                    color="#605F5A" />
            </div>
            <div className={styles.text} style={sizes[size].font}>
                {text}
            </div>
        </div>
    );
}