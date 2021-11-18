import { Link } from "react-router-dom";
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
    return (
      <div className={styles.loginContainer}>
        <div className={styles.rightContainer}>
            <h1 className={styles.header}>Chat with others, anytime...</h1>
            <span className={styles.desc}>Chatter will help you stay close to your friends and your family</span>
            {error && <span className={styles.error}>{error}</span>}
            <input 
              class={styles.input} 
              placeholder="Emial" 
              value={email} 
              onChange={event => setEmail(event.target.value)}  
            />
            <input 
              class={styles.input} 
              placeholder="Password" 
              value={password} 
              type="password"
              onChange={event => setPassword(event.target.value)}  
            />
            <button 
              onClick={onSubmit}
              className={styles.loginButton}
            >
              {formType === 'LOGIN_FORM' ?
                'Login' : 'Register'
              }

            </button>
            {formType === 'LOGIN_FORM' ?
              <>
                <a className={styles.link}>Forgot your password?</a>
                <a className={styles.link}>
                  <Link to="/register">Register</Link>
                </a>
              </> :
              <a className={styles.link}><Link to="/login">Login</Link></a>
            }
        </div>
        <div className={styles.leftContainer}>
            <img className={styles.promoImg} src="chatterPromoImage.png" />
        </div>
      </div>
  );
}

export default AuthForm;
