import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

function LoginStudents() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in...");
        navigate("/");
    };

    return (
        <div className={styles.pageContainer}>
            
            <div className={styles.headerBanner}>
                <h1>Volunteer<br/>Hub Log in</h1>
            </div>

            <div className={styles.loginCard}>
                
                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter email" required />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter password" required />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" className={`${styles.actionBtn} ${styles.btnCancel}`}>
                            Cancel
                        </button>
                        
                        <button type="submit" className={`${styles.actionBtn} ${styles.btnSubmit}`}>
                            Log In
                        </button>
                    </div>
                </form>

                <div className={styles.linkGroup}>
                    <div className={styles.linkRow}>
                        <span>Don't have an account?</span>
                        <Link to="/signup" className={styles.linkItem}>Sign up here</Link>
                    </div>
                    <div className={styles.linkRow}>
                        <span>Forgot password?</span>
                        <Link to="/reset" className={styles.linkItem}>Reset via Email</Link>
                    </div>
                    <div className={styles.linkRow}>
                        <span>Admin Log In:</span>
                        <Link to="/admin" className={styles.linkItem}>Login here</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoginStudents;