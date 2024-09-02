"use client";

import {createContext, useContext, useReducer} from "react";

export const initialState = {
    carts: [],
    reservation: null,
    user: null,
    token: null,
};
const AppContext = createContext<any>(null);
const reducer = (current: any, update: any) => {
    const state = {...current, ...update};
    localStorage.setItem("state", JSON.stringify(state));

    return {...current, ...update};
};

export function Providers({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}