// React hook for localStorage with state synchronization

import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage
 */
export const useLocalStorage = (key, initialValue) => {
    // Get initial value from localStorage or use provided initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    // Update localStorage when state changes
    const setValue = (value) => {
        try {
            // Allow value to be a function (like useState)
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
