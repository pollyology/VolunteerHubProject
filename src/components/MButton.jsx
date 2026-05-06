import { Link } from "react-router-dom";
import styles from "./MButton.module.css"; 

function MButton({ text = "Missing Text", linkTo = "/" }) {
    return (
        <Link to={linkTo} className={styles.mButton}>
            {text}
        </Link>
    );
}

export default MButton;