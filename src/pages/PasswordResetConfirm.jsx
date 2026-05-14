import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

function PasswordResetConfirm() {
    // Grab the uid and token from the URL (e.g., ?uid=123&token=abc)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Basic frontend validation
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsError(true);
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            setIsError(true);
            return;
        }

        if (!uid || !token) {
            setMessage("Invalid reset link. Please request a new email.");
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setMessage(null);
        setIsError(false);

        // 2. Send the confirmation to Django
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/password-reset/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    token: token,
                    new_password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Password reset successfully! Redirecting to login...");
                setIsError(false);
                setPassword('');
                setConfirmPassword('');
                
                // Automatically redirect to login after a short delay
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setMessage(data.detail || "The reset link is invalid or has expired.");
                setIsError(true);
            }
        } catch (error) {
            setMessage("Network error. Is the Django server running?");
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerBanner}>
                <h1>Set New<br/>Password</h1>
            </div>

            <div className={styles.loginCard}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    {message && (
                        <div style={{ 
                            color: isError ? '#db4844' : '#28a745', 
                            textAlign: 'center', 
                            marginBottom: '15px',
                            padding: '10px',
                            backgroundColor: isError ? '#fdecea' : '#e8f5e9',
                            borderRadius: '4px'
                        }}>
                            {message}
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">New Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter new password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            placeholder="Re-enter new password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <Link 
                            to="/login" 
                            className={`${styles.actionBtn} ${styles.btnCancel}`} 
                            style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}
                        >
                            Cancel
                        </Link>
                        
                        <button type="submit" className={`${styles.actionBtn} ${styles.btnSubmit}`} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordResetConfirm;