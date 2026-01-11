// Custom hook for receipt history management

import { useState, useEffect, useCallback } from 'react';
import {
    getReceiptHistory,
    deleteReceipt as deleteReceiptFromStorage,
    clearHistory as clearHistoryFromStorage,
    getStatistics
} from '../services/storage';

export const useHistory = () => {
    const [receipts, setReceipts] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load receipts from storage
    const loadHistory = useCallback(() => {
        setLoading(true);
        try {
            const history = getReceiptHistory();
            setReceipts(history);
            setStatistics(getStatistics());
        } catch (error) {
            console.error('Failed to load history:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load on mount
    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    // Delete a receipt
    const deleteReceipt = useCallback((id) => {
        const success = deleteReceiptFromStorage(id);
        if (success) {
            loadHistory(); // Reload to update state
        }
        return success;
    }, [loadHistory]);

    // Clear all history
    const clearHistory = useCallback(() => {
        const success = clearHistoryFromStorage();
        if (success) {
            setReceipts([]);
            setStatistics({
                totalReceipts: 0,
                totalSavings: 0,
                totalSpent: 0,
                averageSavings: 0,
                overchargedCount: 0,
            });
        }
        return success;
    }, []);

    // Refresh (reload from storage)
    const refresh = useCallback(() => {
        loadHistory();
    }, [loadHistory]);

    return {
        receipts,
        statistics,
        loading,
        deleteReceipt,
        clearHistory,
        refresh,
    };
};

export default useHistory;
