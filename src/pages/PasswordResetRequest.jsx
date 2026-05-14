import { useState } from 'react';
import { Link } from 'react-router-dom';
// Reuse the exact same CSS module to match the mockup perfectly
import styles from './Login.module.css'; 

function PasswordResetRequest() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setIsError(false);

        try {
            // Target the backend endpoint we set up earlier
            const response = await fetch('http://127.0.0.1:8000/api/auth/password-reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Display the generic success message sent by the backend
                setMessage(data.detail || "If an account exists, a reset link has been sent.");
                setIsError(false);
                setEmail(''); // Clear the form on success
            } else {
                setMessage(data.detail || "An error occurred. Please try again.");
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
                <h1>Volunteer<br/>Hub Password Reset</h1>
            </div>

            <div className={styles.loginCard}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    {/* Status Message Display */}
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
                        <label htmlFor="email">Account Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        {/* Styled as a Link but acts as the Cancel button visually */}
                        <Link 
                            to="/login" 
                            className={`${styles.actionBtn} ${styles.btnCancel}`} 
                            style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}
                        >
                            Cancel
                        </Link>
                        
                        <button type="submit" className={`${styles.actionBtn} ${styles.btnSubmit}`} disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send Link'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordResetRequest;