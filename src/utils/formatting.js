// Formatting utilities

/**
 * Format currency based on country
 */
export const formatCurrency = (amount, country = 'Nepal') => {
    const currencyMap = {
        'Nepal': 'NPR',
        'India': 'INR',
        'Bangladesh': 'BDT',
        'Pakistan': 'PKR',
        'USA': 'USD',
        'Russia': 'RUB',
    };

    const currency = currencyMap[country] || 'NPR';

    // Set locale based on currency for proper formatting ($ vs Rs)
    let locale = 'en-NP';
    if (currency === 'USD') locale = 'en-US';
    if (currency === 'RUB') locale = 'ru-RU';

    // Format with 2 decimal places and thousands separator
    const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);

    return `${currency} ${formatted}`;
};

/**
 * Format date to user-friendly string
 */
export const formatDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const now = new Date();
    const diff = now - dateObj;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Relative time for recent dates
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    // Absolute date for older
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: dateObj.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    }).format(dateObj);
};

/**
 * Calculate savings percentage
 */
export const calculateSavingsPercent = (original, optimized) => {
    if (original === 0) return 0;
    const savings = ((original - optimized) / original) * 100;
    return Math.round(savings * 10) / 10; // Round to 1 decimal place
};

/**
 * Format file size to human readable
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Format confidence level to display string
 */
export const formatConfidence = (confidence) => {
    const map = {
        high: '●●●',
        medium: '●●○',
        low: '●○○',
    };
    return map[confidence] || '○○○';
};

/**
 * Format item status to badge variant
 */
export const getStatusBadgeClass = (status) => {
    const classes = {
        fair: 'badge-fair',
        overpriced: 'badge-overpriced',
        cheap: 'badge-success',
        uncertain: 'badge-warning',
    };
    return classes[status] || 'badge-warning';
};
