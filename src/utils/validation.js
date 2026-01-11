// Input validation utilities

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input) => {
    if (!input || typeof input !== 'string') return '';

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

/**
 * Validate analysis response from API
 */
export const validateAnalysisResponse = (data) => {
    // Check if data exists
    if (!data) {
        return { valid: false, error: 'No data received from API' };
    }

    // Check required fields
    const requiredFields = ['items', 'originalTotal', 'optimizedTotal', 'totalSavings'];
    for (const field of requiredFields) {
        if (!(field in data)) {
            return { valid: false, error: `Missing required field: ${field}` };
        }
    }

    // Validate items array
    if (!Array.isArray(data.items) || data.items.length === 0) {
        return { valid: false, error: 'Items must be a non-empty array' };
    }

    // Validate each item
    for (const item of data.items) {
        const itemFields = ['name', 'chargedPrice', 'status'];
        for (const field of itemFields) {
            if (!(field in item)) {
                return { valid: false, error: `Item missing required field: ${field}` };
            }
        }

        // Validate status
        if (!['fair', 'overpriced'].includes(item.status)) {
            return { valid: false, error: `Invalid status: ${item.status}` };
        }
    }

    // Validate totals are numbers
    if (typeof data.originalTotal !== 'number' ||
        typeof data.optimizedTotal !== 'number' ||
        typeof data.totalSavings !== 'number') {
        return { valid: false, error: 'Totals must be numbers' };
    }

    return { valid: true };
};

/**
 * Validate image file
 */
export const validateImage = (file) => {
    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Please upload an image.' };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds 5MB limit.' };
    }

    return { valid: true };
};

/**
 * Validate environment variables
 */
export const validateEnv = () => {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
        return {
            valid: false,
            error: 'OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.',
        };
    }

    return { valid: true };
};

/**
 * Parse and validate JSON response
 */
export const parseJSON = (text) => {
    try {
        // Remove markdown code blocks if present
        let cleaned = text.trim();

        // Remove ```json and ``` markers
        cleaned = cleaned.replace(/^```json\s*/i, '');
        cleaned = cleaned.replace(/^```\s*/i, '');
        cleaned = cleaned.replace(/\s*```$/i, '');

        return JSON.parse(cleaned);
    } catch (error) {
        throw new Error(`Failed to parse JSON: ${error.message}`);
    }
};
