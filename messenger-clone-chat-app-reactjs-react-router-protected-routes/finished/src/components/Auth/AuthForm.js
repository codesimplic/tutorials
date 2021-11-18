import { Link } from "react-router-dom";
import { useAuth } from "../../useAuth";
import styles from "./Login.module.css";

function AuthForm({
  email, 
  password, 
  setEmail, 
  setPassword,
  onSubmit,
  error,
  formType
}) {
  const auth = useAuth();
  console.log("AuthForm", auth);

    return (
      <div className={styles.loginContainer}>
        <div className={styles.rightContainer}>
            <h1 className={styles.header}>Chat with others, anytime...</h1>
            <span className={styles.desc}>Chatter will help you stay close to your friends and your family</span>
            {error && <span className={styles.error}>{error}</span>}
            <input 
              className={styles.input} 
              placeholder="Emial" 
              value={email} 
              onChange={event => setEmail(event.target.value)}  
            />
            <input 
              className={styles.input} 
              placeholder="Password" 
              value={password} 
              type="password"
              onChange={event => setPassword(event.target.value)}  
            />
            <button 
              onClick={async(event) => await onSubmit(event)}
              className={styles.loginButton}
            >
              {formType === 'LOGIN_FORM' ?
                'Login' : 'Register'
              }

            </button>
            {formType === 'LOGIN_FORM' ?
              <>
                <a href="/forgot-password" className={styles.link}>Forgot your password?</a>
                <Link to="/register" className={styles.link}>Register</Link>
              </> :
              <Link to="/login" className={styles.link}>Login</Link>
            }
        </div>
        <div className={styles.leftContainer}>
            <img alt="promoImg" className={styles.promoImg} src="chatterPromoImage.png" />
        </div>
      </div>
  );
}

export default AuthForm;
