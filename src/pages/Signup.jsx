import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useSignupViewModel } from '../hooks/useSignupViewModel';

function Signup() {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        errorMessage,
        handleSignup
    } = useSignupViewModel();

    return (
        <div className={styles.pageContainer}>
            
            <div className={styles.headerBanner}>
                <h1>Volunteer<br/>Hub Sign Up</h1>
            </div>

            <div className={styles.loginCard}>
                
                <form className={styles.form} onSubmit={handleSignup}>
                    
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
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            {isLoading ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className={styles.linkGroup}>
                    <div className={styles.linkRow}>
                        <span>Already have an account?</span>
                        <Link to="/login" className={styles.linkItem}>Login here</Link>
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

export default Signup;