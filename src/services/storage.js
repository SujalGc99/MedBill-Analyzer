// localStorage wrapper for receipt history management

const STORAGE_KEY = 'medbill_receipts';
const MAX_RECEIPTS = 50; // Limit storage to prevent quota issues

/**
 * Save a receipts analysis to history
 */
export const saveReceipt = (receipt) => {
    try {
        const history = getReceiptHistory();

        const newReceipt = {
            id: generateId(),
            timestamp: new Date().toISOString(),
            ...receipt,
        };

        // Add tostart (most recent first)
        history.unshift(newReceipt);

        // Limit total receipts
        const trimmed = history.slice(0, MAX_RECEIPTS);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));

        return newReceipt;
    } catch (error) {
        console.error('Failed to save receipt:', error);
        throw new Error('Failed to save to history');
    }
};

/**
 * Get all receipts from history
 */
export const getReceiptHistory = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load receipt history:', error);
        return [];
    }
};

/**
 * Get a single receipt by ID
 */
export const getReceiptById = (id) => {
    const history = getReceiptHistory();
    return history.find(receipt => receipt.id === id);
};

/**
 * Delete a specific receipt
 */
export const deleteReceipt = (id) => {
    try {
        const history = getReceiptHistory();
        const filtered = history.filter(receipt => receipt.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Failed to delete receipt:', error);
        return false;
    }
};

/**
 * Clear all receipt history
 */
export const clearHistory = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear history:', error);
        return false;
    }
};

/**
 * Get total savings across all receipts
 */
export const getTotalSavings = () => {
    const history = getReceiptHistory();
    return history.reduce((total, receipt) => {
        return total + (receipt.totalSavings || 0);
    }, 0);
};

/**
 * Get statistics from history
 */
export const getStatistics = () => {
    const history = getReceiptHistory();

    if (history.length === 0) {
        return {
            totalReceipts: 0,
            totalSavings: 0,
            totalSpent: 0,
            averageSavings: 0,
            overchargedCount: 0,
        };
    }

    const totalSavings = history.reduce((sum, r) => sum + (r.totalSavings || 0), 0);
    const totalOriginal = history.reduce((sum, r) => sum + (r.originalTotal || 0), 0);
    const overchargedCount = history.filter(r => (r.totalSavings || 0) > 0).length;

    return {
        totalReceipts: history.length,
        totalSavings,
        totalSpent: totalOriginal - totalSavings,
        averageSavings: totalSavings / history.length,
        savingsPercentage: totalOriginal > 0 ? (totalSavings / totalOriginal) * 100 : 0,
        overchargedCount,
    };
};

/**
 * Generate unique ID
 */
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Export receipts as JSON
 */
export const exportAsJSON = () => {
    const history = getReceiptHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medbill-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
};
