import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../useAuth";
import AuthForm from "./AuthForm";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    console.log("Login", auth)

    const onSubmit = async () => {
      await auth.signup(email, password, () => {
          const from = location.state?.from?.pathname || "/chat";
          navigate(from, { replace: true });
      });
    }

    return (
      <AuthForm 
          formType="LOGIN_FORM"
          error={auth.error}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={async () => await onSubmit()}
      />
  );
}

export default Login;
