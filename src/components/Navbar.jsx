import { useNavigate, useLocation } from "react-router-dom";
import MButton from "./MButton";
import styles from "./Navbar.module.css";
import { logout, isAuthenticated } from "../services/authService";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // This forces the Navbar to re-render when the URL changes
    const isAdmin = localStorage.getItem("isStaff") === "true";
    const isAuth = isAuthenticated();

    const handleLogout = async () => {
        await logout(); // Calls the function to clear tokens
        navigate("/login"); // Sends the user back to the login screen
    };

    return (
        <nav className={styles.navbar}>
            {/* Left Side Links */}
            <div className={styles.navGroup}>
                {/* Hide the 'Back' button if the user is logged in */}
                {!isAuth && <MButton text="Back" linkTo="/back" />}
                <MButton text="Volunteer Hub" linkTo="/" />
            </div>

            {/* Right Side Links */}
            <div className={styles.navGroup}>
                {isAuth ? (
                    <>
                        <MButton text="Events" linkTo="/events" />

                        {!isAdmin && (
                            <MButton text="My Events" linkTo="/my-events" />
                        )}

                        <MButton text="Calendar" linkTo="/calendar" />
                        <MButton text="Notifications" linkTo="/notifications" />
                        <MButton text="Forum" linkTo="/forum" />
                        <MButton text="About" linkTo="/about" />
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <MButton text="Home" linkTo="/" />
                        <MButton text="Events" linkTo="/events" />
                        <MButton text="About" linkTo="/about" />
                        <MButton text="Login" linkTo="/login" />
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;