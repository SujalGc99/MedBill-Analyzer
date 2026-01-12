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
        if (!['fair', 'overpriced', 'cheap'].includes(item.status)) {
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

        // Remove comments (//... or /*...*/)
        cleaned = cleaned.replace(/\/\/.*$/gm, '');
        cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

        return JSON.parse(cleaned);
    } catch (error) {
        throw new Error(`Failed to parse JSON: ${error.message}`);
    }
};

/**
 * Validate location detection response
 */
export const validateLocationDetection = (data) => {
    if (!data) {
        return { valid: false, error: 'No location detection data received' };
    }

    const requiredFields = ['detectedCountry', 'detectedCurrency', 'confidence', 'evidence'];
    for (const field of requiredFields) {
        if (!(field in data)) {
            return { valid: false, error: `Missing required field: ${field}` };
        }
    }

    // Validate confidence value
    if (!['high', 'medium', 'low'].includes(data.confidence)) {
        return { valid: false, error: `Invalid confidence value: ${data.confidence}` };
    }

    // Validate evidence is an array
    if (!Array.isArray(data.evidence)) {
        return { valid: false, error: 'Evidence must be an array' };
    }

    // Warnings is optional but must be array if present
    if (data.warnings && !Array.isArray(data.warnings)) {
        return { valid: false, error: 'Warnings must be an array' };
    }

    return { valid: true };
};

/**
 * Check if detected location matches user selection
 */
export const validateLocationMatch = (detectedCountry, userSelectedCountry) => {
    const normalizedDetected = detectedCountry.toLowerCase().trim();
    const normalizedSelected = userSelectedCountry.toLowerCase().trim();

    const isMatch = normalizedDetected === normalizedSelected;

    return {
        isMatch,
        warning: !isMatch
            ? `Warning: Detected location (${detectedCountry}) does not match your selection (${userSelectedCountry}). Results may be inaccurate.`
            : null
    };
};

/**
 * Validate price ranges in analysis items
 * Ensures fairPriceMin < fairPriceMax and ranges are reasonable
 */
export const validatePriceRanges = (items) => {
    const errors = [];
    const warnings = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Check if fair prices exist
        if (!('fairPriceMin' in item) || !('fairPriceMax' in item)) {
            errors.push(`Item ${i + 1} (${item.name}): Missing fairPriceMin or fairPriceMax`);
            continue;
        }

        // Check fairPriceMin <= fairPriceMax (allow equal values for exact prices)
        if (item.fairPriceMin > item.fairPriceMax) {
            errors.push(`Item ${i + 1} (${item.name}): fairPriceMin (${item.fairPriceMin}) cannot be greater than fairPriceMax (${item.fairPriceMax})`);
        }

        // Check for unreasonable ranges - WARNING ONLY, not error
        const chargedPrice = item.chargedPrice;
        const fairAvg = (item.fairPriceMin + item.fairPriceMax) / 2;

        if (chargedPrice > 0 && fairAvg > 0) {
            const ratio = chargedPrice / fairAvg;

            // Warn about suspicious ratios (but don't fail)
            // Some expensive procedures can legitimately be 100x+ overpriced
            if (ratio > 100) {
                warnings.push(`Item ${i + 1} (${item.name}): Very high price ratio (charged: ${chargedPrice.toLocaleString()}, fair avg: ${fairAvg.toFixed(2)}). Ratio: ${ratio.toFixed(1)}x - AI may have inaccurate price data.`);
            } else if (ratio < 0.01) {
                warnings.push(`Item ${i + 1} (${item.name}): Very low price ratio (charged: ${chargedPrice.toLocaleString()}, fair avg: ${fairAvg.toFixed(2)}). Ratio: ${ratio.toFixed(3)}x - AI may have inaccurate price data.`);
            }
        }

        // Check for negative prices (this IS an error)
        if (item.chargedPrice < 0 || item.fairPriceMin < 0 || item.fairPriceMax < 0) {
            errors.push(`Item ${i + 1} (${item.name}): Prices cannot be negative`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * Validate currency consistency across all items
 */
export const validateCurrencyConsistency = (data) => {
    if (!data.currency) {
        return { valid: false, error: 'No currency specified in response' };
    }

    // All items should use consistent pricing
    const errors = [];
    const warnings = [];

    // Check totals make sense (but be lenient - bills often have fees, taxes, etc.)
    const itemsSum = data.items.reduce((sum, item) => sum + (item.chargedPrice || 0), 0);
    const totalDifference = Math.abs(itemsSum - data.originalTotal);

    // Allow 15% difference for rounding, taxes, service charges, etc.
    // Changed to WARNING instead of error - total mismatch shouldn't block analysis
    if (totalDifference > itemsSum * 0.15) {
        warnings.push(`Items sum (${itemsSum.toFixed(2)}) differs from total (${data.originalTotal}). May include unlisted fees/taxes.`);
    }

    // Check optimized total <= original total
    if (data.optimizedTotal > data.originalTotal) {
        errors.push(`Optimized total (${data.optimizedTotal}) cannot be greater than original total (${data.originalTotal})`);
    }

    // Check savings calculation
    const calculatedSavings = data.originalTotal - data.optimizedTotal;
    const savingsDifference = Math.abs(calculatedSavings - data.totalSavings);

    if (savingsDifference > 1) {
        errors.push(`Total savings (${data.totalSavings}) does not match calculated savings (${calculatedSavings.toFixed(2)})`);
    }

    return {
        valid: errors.length === 0,  // Only fail on critical errors
        errors,
        warnings
    };
};

/**
 * Validate confidence scores
 * Ensures not all items are marked as high confidence
 */
export const validateConfidenceScores = (items) => {
    const confidenceCounts = { high: 0, medium: 0, low: 0 };

    for (const item of items) {
        if (item.confidence) {
            confidenceCounts[item.confidence] = (confidenceCounts[item.confidence] || 0) + 1;
        }
    }

    const totalItems = items.length;
    const highConfidenceRatio = confidenceCounts.high / totalItems;

    // If more than 90% are "high confidence", it's suspicious
    const warnings = [];
    if (highConfidenceRatio > 0.9 && totalItems > 5) {
        warnings.push('Most items marked as high confidence - AI may be overconfident. Review carefully.');
    }

    return {
        valid: true,
        warnings,
        stats: confidenceCounts
    };
};

/**
 * Comprehensive validation of analysis response
 * Runs all validation checks
 */
export const validateCompleteAnalysis = (data, detectionData = null) => {
    const errors = [];
    const warnings = [];

    // Basic structure validation
    const structureCheck = validateAnalysisResponse(data);
    if (!structureCheck.valid) {
        errors.push(structureCheck.error);
        return { valid: false, errors, warnings };
    }

    // Price range validation
    const priceCheck = validatePriceRanges(data.items);
    if (!priceCheck.valid) {
        errors.push(...(priceCheck.errors || []));
    }
    if (priceCheck.warnings && priceCheck.warnings.length > 0) {
        warnings.push(...priceCheck.warnings);
    }

    // Currency consistency validation
    const currencyCheck = validateCurrencyConsistency(data);
    if (!currencyCheck.valid) {
        errors.push(currencyCheck.error || 'Currency validation failed');
    }
    if (currencyCheck.warnings && currencyCheck.warnings.length > 0) {
        warnings.push(...currencyCheck.warnings);
    }

    // Confidence score validation
    const confidenceCheck = validateConfidenceScores(data.items);
    if (confidenceCheck.warnings && confidenceCheck.warnings.length > 0) {
        warnings.push(...confidenceCheck.warnings);
    }

    // Location validation if detection data provided
    if (detectionData && detectionData.warnings) {
        warnings.push(...detectionData.warnings);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        stats: {
            itemCount: data.items.length,
            totalSavings: data.totalSavings,
            savingsPercentage: data.savingsPercentage
        }
    };
};
