import React, { createContext, useContext, useReducer } from 'react';

// Создание контекста
const PaymentContext = createContext();

// Использование useReducer для управления состоянием
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAYMENT_DATA':
            return {
                ...state,
                ...action.payload
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// Провайдер контекста
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, { account: '', order: '', amount: '', paymentMethods: [] });

    // Значение, передаваемое провайдером
    const value = { state, dispatch };
    return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
}

// Хук для использования контекста в компонентах
export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (context === undefined) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
}
