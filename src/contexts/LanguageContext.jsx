import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Try to get language from localStorage, default to 'en'
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('medbill_language');
        return saved || 'en';
    });

    useEffect(() => {
        localStorage.setItem('medbill_language', language);
        // Update html lang attribute
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ne' : 'en');
    };

    // Helper to get nested translation value
    const t = (path, replacements = {}) => {
        const keys = path.split('.');
        let current = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
            current = current[key];
        }

        // Handle replacements (e.g. {amount} -> Rs. 500)
        let result = current;
        Object.keys(replacements).forEach(key => {
            result = result.replace(`{${key}}`, replacements[key]);
        });

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
