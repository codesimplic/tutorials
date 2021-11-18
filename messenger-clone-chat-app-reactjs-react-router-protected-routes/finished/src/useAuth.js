import { createContext, useContext, useState } from "react";
import { login } from "./endpoints";

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const signup = async (email, password, callback) => {
        const {response, decodedResponse} = await login(email, password);

        setUser(null)
        setError(null)

        console.log({decodedResponse})
        if (decodedResponse.error) {
          return setError(decodedResponse.error)
        }

        if (response.status === 200) {
            setUser(decodedResponse);
            callback();
        }
    }

    const value = {user, error, signup}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
