// OpenRouter API integration for AI-powered receipt analysis - Two-Phase System

import { LOCATION_DETECTION_PROMPT, ANALYSIS_PROMPT, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/prompts';
import {
    validateEnv,
    parseJSON,
    validateLocationDetection,
    validateLocationMatch,
    validateCompleteAnalysis
} from '../utils/validation';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * PHASE 1: Detect bill location from image
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {object} Location detection result
 */
export const detectBillLocation = async (imageBase64) => {
    const envCheck = validateEnv();
    if (!envCheck.valid) {
        throw new Error(envCheck.error);
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = import.meta.env.VITE_DEFAULT_MODEL || 'anthropic/claude-3.5-sonnet';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'MedBill Analyzer - Location Detection',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`
                                }
                            },
                            {
                                type: 'text',
                                text: LOCATION_DETECTION_PROMPT
                            }
                        ]
                    }
                ],
                temperature: 0.2, // Lower temperature for consistent detection
                max_tokens: 1000,
            })
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error(ERROR_MESSAGES.RATE_LIMIT);
            } else if (response.status === 401) {
                throw new Error(ERROR_MESSAGES.NO_API_KEY);
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || ERROR_MESSAGES.API_ERROR);
            }
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error(ERROR_MESSAGES.LOCATION_DETECTION_FAILED);
        }

        // Parse the JSON response
        const parsedResult = parseResponse(content);

        // Validate the structure
        const validation = validateLocationDetection(parsedResult);
        if (!validation.valid) {
            throw new Error(`Invalid location detection response: ${validation.error}`);
        }

        return parsedResult;

    } catch (error) {
        console.error('Location Detection Error:', error);

        if (error.message.includes('fetch')) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }

        throw error;
    }
};

/**
 * PHASE 2: Analyze receipt with validated location data
 * @param {string} imageBase64 - Base64 encoded image
 * @param {string} targetCountry - Country to compare prices against
 * @param {string} originCountry - Country where bill originated (user selected)
 * @param {object} detectionData - Location detection result from Phase 1
 * @param {string} modelOverride - Optional model override (for fallback)
 */
export const analyzeReceipt = async (imageBase64, targetCountry = 'Nepal', originCountry = 'Nepal', detectionData = null, modelOverride = null) => {
    // Validate environment
    const envCheck = validateEnv();
    if (!envCheck.valid) {
        throw new Error(envCheck.error);
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = modelOverride || import.meta.env.VITE_DEFAULT_MODEL || 'anthropic/claude-3.5-sonnet';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'MedBill Analyzer',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`
                                }
                            },
                            {
                                type: 'text',
                                text: ANALYSIS_PROMPT(targetCountry, originCountry, detectionData)
                            }
                        ]
                    }
                ],
                temperature: 0.3, // Lower temperature for more consistent results
                max_tokens: 4000, // Increased for receipts with many items
            })
        });

        if (!response.ok) {
            // Handle specific error codes
            if (response.status === 429) {
                throw new Error(ERROR_MESSAGES.RATE_LIMIT);
            } else if (response.status === 401) {
                throw new Error(ERROR_MESSAGES.NO_API_KEY);
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || ERROR_MESSAGES.API_ERROR);
            }
        }

        const data = await response.json();

        // Extract the response content
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error(ERROR_MESSAGES.PARSE_ERROR);
        }

        // Parse the JSON response
        const parsedResult = parseResponse(content);

        // Comprehensive validation
        const validation = validateCompleteAnalysis(parsedResult, detectionData);

        // Log warnings to console but don't fail
        if (validation.warnings.length > 0) {
            console.warn('Analysis Warnings:', validation.warnings);
        }

        // Only fail if there are hard errors
        if (!validation.valid) {
            console.error('Validation Errors:', validation.errors);
            throw new Error(`Analysis validation failed: ${validation.errors[0]}`);
        }

        // Attach validation metadata
        parsedResult._validation = {
            warnings: validation.warnings,
            stats: validation.stats
        };

        return parsedResult;

    } catch (error) {
        console.error('API Error:', error);

        // Network errors
        if (error.message.includes('fetch')) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }

        // Re-throw with original message
        throw error;
    }
};

/**
 * Complete two-phase analysis workflow
 * @param {string} imageBase64 - Base64 encoded image
 * @param {string} targetCountry - Country to compare prices against
 * @param {string} originCountry - Country where bill originated (user claimed)
 * @param {function} onProgressUpdate - Callback for progress updates
 */
export const analyzReceiptComplete = async (imageBase64, targetCountry = 'Nepal', originCountry = 'Nepal', onProgressUpdate = null) => {
    try {
        // Phase 1: Detect location
        if (onProgressUpdate) {
            onProgressUpdate({ phase: 'detection', status: 'Detecting bill location...', progress: 20 });
        }

        const detectionData = await detectBillLocation(imageBase64);

        if (onProgressUpdate) {
            onProgressUpdate({
                phase: 'detection_complete',
                status: 'Location detected',
                progress: 40,
                detectionData
            });
        }

        // Check for location mismatch
        const locationCheck = validateLocationMatch(detectionData.detectedCountry, originCountry);

        if (!locationCheck.isMatch) {
            console.warn('Location Mismatch:', locationCheck.warning);

            if (onProgressUpdate) {
                onProgressUpdate({
                    phase: 'warning',
                    warning: locationCheck.warning,
                    detectionData
                });
            }
        }

        // Phase 2: Analyze with detection data
        if (onProgressUpdate) {
            onProgressUpdate({ phase: 'analysis', status: 'Analyzing prices...', progress: 60 });
        }

        const analysisResult = await analyzeReceipt(
            imageBase64,
            targetCountry,
            originCountry,
            detectionData
        );

        // Attach detection data to result
        analysisResult._detectionData = detectionData;
        analysisResult._locationMatch = locationCheck;

        if (onProgressUpdate) {
            onProgressUpdate({ phase: 'complete', status: 'Analysis complete', progress: 100 });
        }

        return analysisResult;

    } catch (error) {
        console.error('Complete Analysis Error:', error);
        throw error;
    }
};

/**
 * Parse the AI response (handles JSON extraction from markdown)
 */
const parseResponse = (content) => {
    try {
        // Try direct JSON parse first
        return parseJSON(content);
    } catch (error) {
        // If that fails, try to extract JSON from text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return parseJSON(jsonMatch[0]);
        }
        throw new Error(ERROR_MESSAGES.PARSE_ERROR);
    }
};

/**
 * Test API connection
 */
export const testConnection = async () => {
    const envCheck = validateEnv();
    if (!envCheck.valid) {
        return { success: false, error: envCheck.error };
    }

    try {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        const response = await fetch('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: 'Invalid API key' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};
