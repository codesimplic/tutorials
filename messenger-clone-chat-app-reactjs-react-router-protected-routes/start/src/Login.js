import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthForm from "./AuthForm";
import styles from "./Login.module.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
  
    const onSubmit = async () => {
        const data = {email, password};

        const url = 'http://localhost:3000/api/login';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }

        const response = await fetch(url, options);
        const decodedResponse = await response.json();

        setError('')
        if (decodedResponse.error) {
          return setError(decodedResponse.error)
        }

        if (response.status === 200) {
          let from = location.state?.from?.pathname || "/chat";
          navigate(from, { replace: true });
        }
    }

    return (
      <AuthForm 
          formType="LOGIN_FORM"
          error={error}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={async () => await onSubmit()}
      />
  );
}

export default Login;
