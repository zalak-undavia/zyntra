import { useState } from "react";
import { createContext, useContext } from "react";

const Context = createContext(null);

export const HeaderContext = ({ children }) => {
    const [count, setCount] = useState(0);

    const calculateProduct = () => {
        setCount((r) => r + 1);
    };
    return (
        <Context.Provider value={{ count, calculateProduct }}>
            {children}
        </Context.Provider>
    );
};

export const HeadcontextInHeader = () => {
    return useContext(Context);
};
