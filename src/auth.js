import { useState } from "react";
import { createContext, useContext } from "react";

export const authC = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState("");

    const loggedIn = (user) => {
        setUserName(user);
    };

    const logOutFun = () => {
        setUserName("");
    };

    return (
        <authC.Provider value={{ userName, loggedIn, logOutFun }}>
            {children}
        </authC.Provider>
    );
};

export const useAuth = () => {
    return useContext(authC);
};
