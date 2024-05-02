import styles from "./image.module.css";
import defaultImage from "./default.svg";
import successImage from "./success.svg";
import errorImage from "./error.svg";
import pendingImage from "./pending.svg";

const images = {
    "default": defaultImage,
    "success": successImage,
    "error": errorImage,
    "pending": pendingImage
};

export default function Footer({ type = "default" }) {
    return (
        <div className={styles.Image}>
            <img src={images[type]}/>       
        </div>
    );
}