import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useLoginViewModel } from '../hooks/useLoginViewModel';

function LoginAdmin() {
    // Pass 'true' to tell the hook this is the admin login flow
    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        errorMessage,
        handleLogin
    } = useLoginViewModel(true);

    return (
        <div className={styles.pageContainer}>
            
            <div className={styles.headerBanner}>
                <h1>Admin<br/>Hub Log in</h1>
            </div>

            <div className={styles.loginCard}>
                
                <form className={styles.form} onSubmit={handleLogin}>
                    
                    {errorMessage && (
                        <div style={{ color: '#db4844', textAlign: 'center', marginBottom: '10px' }}>
                            {errorMessage}
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" className={`${styles.actionBtn} ${styles.btnCancel}`} disabled={isLoading}>
                            Cancel
                        </button>
                        
                        <button type="submit" className={`${styles.actionBtn} ${styles.btnSubmit}`} disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Log In'}
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
                </div>

            </div>
        </div>
    );
}

export default LoginAdmin;