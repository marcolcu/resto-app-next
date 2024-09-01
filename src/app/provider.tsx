"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext<any>(null);

export const initialState = {
    carts: [],
    reservation: null,
    user: null,
    token: null,
};

const reducer = (state: any, action: any) => {
    const updatedState = { ...state, ...action };
    localStorage.setItem("state", JSON.stringify(updatedState));
    return updatedState;
};

export function Providers({ children }: { children: React.ReactNode }) {
    // Load state from localStorage if available, otherwise use initialState
    const [state, dispatch] = useReducer(
        reducer,
        JSON.parse(localStorage.getItem("state") || "{}") || initialState
    );

    // Sync state with localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state));
    }, [state]);

    const value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
