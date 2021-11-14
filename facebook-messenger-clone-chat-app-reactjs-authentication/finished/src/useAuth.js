import {useContext, useState, createContext} from "react";

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
}

export function ProvideAuth({ children }) {
    return <authContext.Provider 
        value={useProvideAuth()}>
            {children}
    </authContext.Provider>; 
}

function useProvideAuth() {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem('loggedIn') === 'true'
    );

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

    const isLoggedIn = async () => {
        const url = "http://localhost:3000/api/user/status";
        const response = await fetch(url);
        const decodedResponse = await response.json();

        if (response.status === 401) {
            localStorage.setItem('loggedIn', 'false');
            setLoggedIn(false);


            return false;
        }

        localStorage.setItem('loggedIn', 'true');
        setLoggedIn(true);
        setUsername(decodedResponse.username);
        setUserId(decodedResponse.userId);
        setUser(decodedResponse);

        return true;
    }

    const logout = async () => {
        const url = "http://localhost:3000/api/logout";
        const response = await fetch(url);

        if (response.status === 200) {
            await localStorage.setItem('loggedIn', 'false');
            await setLoggedIn(false);
        }
    }

    return {
        error,
        loggedIn,
        username,
        userId,
        user,
        login,
        logout,
        isLoggedIn
    }
}
